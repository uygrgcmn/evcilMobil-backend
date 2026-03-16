"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const DEMO_USER_EMAILS = [
    'owner@evcilmobil.com',
    'elif.sitter@evcilmobil.com',
    'can.sitter@evcilmobil.com',
    'zeynep.sitter@evcilmobil.com',
];
const ALLOWED_SERVICE_UNITS = ['/day', '/walk', '/night', '/session', '/hour'];
const ALLOWED_SERVICE_ICONS = ['pets', 'directions-walk', 'hotel', 'home', 'medical-services'];
let ListingsService = class ListingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMyListings(user) {
        const listings = await this.prisma.listing.findMany({
            where: {
                publishedByUserId: user.id,
            },
            include: {
                publishedByUser: {
                    select: {
                        id: true,
                        role: true,
                        email: true,
                        activeLocation: {
                            select: {
                                latitude: true,
                                longitude: true,
                                accuracy: true,
                                lastSharedAt: true,
                            },
                        },
                    },
                },
            },
            orderBy: [{ isActive: 'desc' }, { updatedAt: 'desc' }],
        });
        return listings.map((listing) => this.mapListing(listing));
    }
    async getFeatured(forRole, options = {}) {
        const listingType = this.resolveViewerListingType(forRole);
        const listings = await this.prisma.listing.findMany({
            where: {
                listingType,
                isFeatured: true,
                isActive: true,
                publishedByUser: this.buildDemoUserFilter(options.includeDemo),
            },
            include: {
                publishedByUser: {
                    select: {
                        id: true,
                        role: true,
                        email: true,
                        activeLocation: {
                            select: {
                                latitude: true,
                                longitude: true,
                                accuracy: true,
                                lastSharedAt: true,
                            },
                        },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
            take: 20,
        });
        return listings.map((listing) => this.mapListing(listing));
    }
    async getNearby(forRole, city, district, options = {}) {
        const listingType = this.resolveViewerListingType(forRole);
        const listings = await this.prisma.listing.findMany({
            where: {
                listingType,
                isActive: true,
                publishedByUser: this.buildDemoUserFilter(options.includeDemo),
                city: city?.trim()
                    ? { equals: city.trim(), mode: 'insensitive' }
                    : undefined,
                district: district?.trim()
                    ? { equals: district.trim(), mode: 'insensitive' }
                    : undefined,
            },
            include: {
                publishedByUser: {
                    select: {
                        id: true,
                        role: true,
                        email: true,
                        activeLocation: {
                            select: {
                                latitude: true,
                                longitude: true,
                                accuracy: true,
                                lastSharedAt: true,
                            },
                        },
                    },
                },
            },
            orderBy: [{ isFeatured: 'desc' }, { updatedAt: 'desc' }],
            take: 40,
        });
        return listings.map((listing) => this.mapListing(listing));
    }
    async getById(id, forRole, options = {}) {
        const listingType = this.resolveViewerListingType(forRole);
        const listing = await this.prisma.listing.findFirst({
            where: {
                id,
                listingType,
                publishedByUser: this.buildDemoUserFilter(options.includeDemo),
            },
            include: {
                publishedByUser: {
                    select: {
                        id: true,
                        role: true,
                        email: true,
                        activeLocation: {
                            select: {
                                latitude: true,
                                longitude: true,
                                accuracy: true,
                                lastSharedAt: true,
                            },
                        },
                    },
                },
            },
        });
        if (!listing) {
            throw new common_1.NotFoundException('Listing not found');
        }
        return this.mapListing(listing);
    }
    async createMyListing(user, input) {
        const title = this.validateText(input.title, 'title');
        const description = this.validateText(input.description, 'description');
        const city = this.validateText(input.city, 'city');
        const district = this.validateText(input.district, 'district');
        if (user.role === client_1.UserRole.OWNER) {
            const ownerProfile = await this.prisma.ownerProfile.findUnique({
                where: { userId: user.id },
                select: { id: true },
            });
            if (!ownerProfile) {
                throw new common_1.NotFoundException('Owner profile not found');
            }
            return this.prisma.listing.create({
                data: {
                    title,
                    description,
                    city,
                    district,
                    listingType: client_1.ListingType.OWNER_REQUEST,
                    budgetPerDay: this.parsePrice(input.budgetPerDay, 'budgetPerDay'),
                    servicePricePerDay: null,
                    serviceUnit: null,
                    serviceIcon: null,
                    ownerProfileId: ownerProfile.id,
                    publishedByUserId: user.id,
                },
            });
        }
        const sitterProfile = await this.prisma.sitter.findUnique({
            where: { userId: user.id },
            select: { id: true },
        });
        if (!sitterProfile) {
            throw new common_1.NotFoundException('Sitter profile not found');
        }
        const rawUnit = input.serviceUnit?.trim() ?? '';
        const rawIcon = input.serviceIcon?.trim() ?? '';
        const serviceUnit = ALLOWED_SERVICE_UNITS.includes(rawUnit) ? rawUnit : '/day';
        const serviceIcon = ALLOWED_SERVICE_ICONS.includes(rawIcon) ? rawIcon : 'pets';
        await this.prisma.sitter.update({
            where: { id: sitterProfile.id },
            data: { isFeatured: true },
        });
        return this.prisma.listing.create({
            data: {
                title,
                description,
                city,
                district,
                listingType: client_1.ListingType.SITTER_SERVICE,
                budgetPerDay: null,
                servicePricePerDay: this.parsePrice(input.servicePricePerDay, 'servicePricePerDay'),
                serviceUnit,
                serviceIcon,
                sitterId: sitterProfile.id,
                publishedByUserId: user.id,
            },
        });
    }
    async deleteMyListing(user, id) {
        const owned = await this.prisma.listing.findFirst({
            where: { id, publishedByUserId: user.id },
            select: { id: true },
        });
        if (!owned) {
            throw new common_1.NotFoundException('Listing not found or not owned by user');
        }
        await this.prisma.listing.delete({ where: { id } });
    }
    mapListing(listing) {
        const { activeLocation, ...publishedByUser } = listing.publishedByUser;
        return {
            ...listing,
            publishedByUser,
            latitude: activeLocation?.latitude ?? null,
            longitude: activeLocation?.longitude ?? null,
            locationAccuracy: activeLocation?.accuracy ?? null,
            locationLastSharedAt: activeLocation?.lastSharedAt ?? null,
        };
    }
    resolveViewerListingType(forRole) {
        const normalized = forRole?.trim().toLowerCase();
        if (normalized === 'sitter') {
            return client_1.ListingType.OWNER_REQUEST;
        }
        return client_1.ListingType.SITTER_SERVICE;
    }
    buildDemoUserFilter(includeDemo = false) {
        if (includeDemo) {
            return undefined;
        }
        return {
            is: {
                email: {
                    notIn: [...DEMO_USER_EMAILS],
                },
            },
        };
    }
    validateText(value, field) {
        if (!value || typeof value !== 'string' || !value.trim()) {
            throw new common_1.BadRequestException(`${field} is required`);
        }
        return value.trim();
    }
    parsePrice(value, field) {
        if (value === undefined || value === null || value === '') {
            return null;
        }
        const parsed = typeof value === 'number' ? value : Number(value);
        if (!Number.isFinite(parsed) || parsed < 0) {
            throw new common_1.BadRequestException(`${field} must be a positive number`);
        }
        return Math.round(parsed);
    }
};
exports.ListingsService = ListingsService;
exports.ListingsService = ListingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ListingsService);
//# sourceMappingURL=listings.service.js.map