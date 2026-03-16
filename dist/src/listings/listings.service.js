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
const MIN_TITLE_LENGTH = 8;
const MIN_DESCRIPTION_LENGTH = 40;
const LISTING_INCLUDE = {
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
            ownerProfile: {
                select: {
                    fullName: true,
                    avatarUrl: true,
                    _count: {
                        select: {
                            pets: true,
                            reviews: true,
                        },
                    },
                },
            },
            sitterProfile: {
                select: {
                    fullName: true,
                    avatarUrl: true,
                    identityVerified: true,
                    yearsExperience: true,
                    reviewCount: true,
                    repeatClientRate: true,
                    galleryImageUrls: true,
                },
            },
        },
    },
};
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
            include: LISTING_INCLUDE,
            orderBy: [{ isActive: 'desc' }, { updatedAt: 'desc' }],
        });
        const mapped = listings.map((listing) => this.mapListing(listing));
        return mapped.sort((a, b) => {
            if (a.isActive !== b.isActive) {
                return a.isActive ? -1 : 1;
            }
            if (a.qualityScore !== b.qualityScore) {
                return b.qualityScore - a.qualityScore;
            }
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        });
    }
    async getFeatured(forRole, options = {}) {
        const listingType = this.resolveViewerListingFilter(forRole);
        const listings = await this.prisma.listing.findMany({
            where: {
                listingType: listingType ?? undefined,
                isFeatured: true,
                isActive: true,
                publishedByUser: this.buildDemoUserFilter(options.includeDemo),
            },
            include: LISTING_INCLUDE,
            orderBy: { createdAt: 'desc' },
            take: 20,
        });
        const mapped = listings.map((listing) => this.mapListing(listing));
        return mapped.sort((a, b) => {
            if (a.qualityScore !== b.qualityScore) {
                return b.qualityScore - a.qualityScore;
            }
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    }
    async getNearby(forRole, city, district, options = {}) {
        const listingType = this.resolveViewerListingFilter(forRole);
        const listings = await this.prisma.listing.findMany({
            where: {
                listingType: listingType ?? undefined,
                isActive: true,
                publishedByUser: this.buildDemoUserFilter(options.includeDemo),
                city: city?.trim()
                    ? { equals: city.trim(), mode: 'insensitive' }
                    : undefined,
                district: district?.trim()
                    ? { equals: district.trim(), mode: 'insensitive' }
                    : undefined,
            },
            include: LISTING_INCLUDE,
            orderBy: [{ isFeatured: 'desc' }, { updatedAt: 'desc' }],
            take: 40,
        });
        const mapped = listings.map((listing) => this.mapListing(listing));
        return mapped.sort((a, b) => {
            if (a.qualityScore !== b.qualityScore) {
                return b.qualityScore - a.qualityScore;
            }
            if (a.isFeatured !== b.isFeatured) {
                return a.isFeatured ? -1 : 1;
            }
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        });
    }
    async getById(id, forRole, options = {}) {
        const listing = await this.prisma.listing.findFirst({
            where: {
                id,
                publishedByUser: this.buildDemoUserFilter(options.includeDemo),
            },
            include: LISTING_INCLUDE,
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
        this.assertListingTextQuality(title, description);
        const budgetPerDay = this.parsePrice(input.budgetPerDay, 'budgetPerDay');
        const servicePricePerDay = this.parsePrice(input.servicePricePerDay, 'servicePricePerDay');
        if ((budgetPerDay === null && servicePricePerDay === null) || (budgetPerDay !== null && servicePricePerDay !== null)) {
            throw new common_1.BadRequestException('Provide either budgetPerDay or servicePricePerDay');
        }
        if (budgetPerDay !== null) {
            const ownerProfile = await this.ensureOwnerProfile(user.id);
            this.assertOwnerMediaEligibility(ownerProfile);
            const created = await this.prisma.listing.create({
                data: {
                    title,
                    description,
                    city,
                    district,
                    listingType: client_1.ListingType.OWNER_REQUEST,
                    budgetPerDay,
                    servicePricePerDay: null,
                    serviceUnit: null,
                    serviceIcon: null,
                    ownerProfileId: ownerProfile.id,
                    sitterId: null,
                    publishedByUserId: user.id,
                },
                include: LISTING_INCLUDE,
            });
            return this.mapListing(created);
        }
        const sitterProfile = await this.ensureSitterProfile(user.id);
        this.assertSitterMediaEligibility(sitterProfile);
        const rawUnit = input.serviceUnit?.trim() ?? '';
        const rawIcon = input.serviceIcon?.trim() ?? '';
        const serviceUnit = ALLOWED_SERVICE_UNITS.includes(rawUnit) ? rawUnit : '/day';
        const serviceIcon = ALLOWED_SERVICE_ICONS.includes(rawIcon) ? rawIcon : 'pets';
        await this.prisma.sitter.update({
            where: { id: sitterProfile.id },
            data: { isFeatured: true },
        });
        const created = await this.prisma.listing.create({
            data: {
                title,
                description,
                city,
                district,
                listingType: client_1.ListingType.SITTER_SERVICE,
                budgetPerDay: null,
                servicePricePerDay,
                serviceUnit,
                serviceIcon,
                sitterId: sitterProfile.id,
                ownerProfileId: null,
                publishedByUserId: user.id,
            },
            include: LISTING_INCLUDE,
        });
        return this.mapListing(created);
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
        const verification = this.resolvePublisherVerification(listing.publishedByUser);
        const quality = this.computeListingQuality(listing, verification.level);
        return {
            ...listing,
            publishedByUser,
            publisherVerificationLevel: verification.level,
            qualityScore: quality.score,
            qualityTier: quality.tier,
            qualityReasons: quality.reasons,
            latitude: activeLocation?.latitude ?? null,
            longitude: activeLocation?.longitude ?? null,
            locationAccuracy: activeLocation?.accuracy ?? null,
            locationLastSharedAt: activeLocation?.lastSharedAt ?? null,
        };
    }
    resolveViewerListingFilter(forRole) {
        const normalized = forRole?.trim().toLowerCase();
        if (normalized === 'sitter') {
            return client_1.ListingType.OWNER_REQUEST;
        }
        if (normalized === 'owner') {
            return client_1.ListingType.SITTER_SERVICE;
        }
        return undefined;
    }
    async ensureOwnerProfile(userId) {
        const existing = await this.prisma.ownerProfile.findUnique({
            where: { userId },
            select: {
                id: true,
                avatarUrl: true,
                pets: {
                    select: { id: true },
                    take: 1,
                },
            },
        });
        if (existing) {
            return existing;
        }
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                email: true,
                sitterProfile: {
                    select: {
                        fullName: true,
                        city: true,
                        district: true,
                        avatarUrl: true,
                        about: true,
                        rating: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const created = await this.prisma.ownerProfile.create({
            data: {
                userId,
                fullName: user.sitterProfile?.fullName || user.email.split('@')[0] || 'Kullanici',
                roleLabel: 'EvcilMobil Kullanicisi',
                city: user.sitterProfile?.city || '',
                district: user.sitterProfile?.district || user.sitterProfile?.city || '',
                avatarUrl: user.sitterProfile?.avatarUrl || '',
                about: user.sitterProfile?.about || '',
                averageRating: user.sitterProfile?.rating ?? 0,
            },
            select: {
                id: true,
                avatarUrl: true,
                pets: {
                    select: { id: true },
                    take: 1,
                },
            },
        });
        return created;
    }
    async ensureSitterProfile(userId) {
        const existing = await this.prisma.sitter.findUnique({
            where: { userId },
            select: {
                id: true,
                avatarUrl: true,
                galleryImageUrls: true,
            },
        });
        if (existing) {
            return existing;
        }
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                email: true,
                ownerProfile: {
                    select: {
                        fullName: true,
                        city: true,
                        district: true,
                        avatarUrl: true,
                        about: true,
                        averageRating: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const created = await this.prisma.sitter.create({
            data: {
                userId,
                fullName: user.ownerProfile?.fullName || user.email.split('@')[0] || 'Kullanici',
                city: user.ownerProfile?.city || '',
                district: user.ownerProfile?.district || user.ownerProfile?.city || '',
                about: user.ownerProfile?.about || '',
                yearsExperience: 0,
                identityVerified: false,
                repeatClientRate: 0,
                galleryImageUrls: [],
                rating: user.ownerProfile?.averageRating ?? 0,
                reviewCount: 0,
                pricePerDay: 350,
                pricePerHour: 120,
                avatarUrl: user.ownerProfile?.avatarUrl || '',
                isFeatured: false,
                tags: [],
            },
            select: {
                id: true,
                avatarUrl: true,
                galleryImageUrls: true,
            },
        });
        return created;
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
    assertListingTextQuality(title, description) {
        if (title.trim().length < MIN_TITLE_LENGTH) {
            throw new common_1.BadRequestException(`title must be at least ${MIN_TITLE_LENGTH} characters`);
        }
        if (description.trim().length < MIN_DESCRIPTION_LENGTH) {
            throw new common_1.BadRequestException(`description must be at least ${MIN_DESCRIPTION_LENGTH} characters`);
        }
    }
    assertOwnerMediaEligibility(ownerProfile) {
        if (!ownerProfile.avatarUrl?.trim()) {
            throw new common_1.BadRequestException('Owner profile avatar is required before publishing listing');
        }
        if (ownerProfile.pets.length === 0) {
            throw new common_1.BadRequestException('Add at least one pet profile before publishing listing');
        }
    }
    assertSitterMediaEligibility(sitterProfile) {
        if (!sitterProfile.avatarUrl?.trim()) {
            throw new common_1.BadRequestException('Sitter avatar is required before publishing listing');
        }
        if (!Array.isArray(sitterProfile.galleryImageUrls) || sitterProfile.galleryImageUrls.length === 0) {
            throw new common_1.BadRequestException('Add at least one gallery image before publishing listing');
        }
    }
    resolvePublisherVerification(publisher) {
        const sitter = publisher.sitterProfile;
        const owner = publisher.ownerProfile;
        const phoneVerified = Boolean(sitter?.avatarUrl?.trim() || owner?.avatarUrl?.trim());
        const identityVerified = Boolean(sitter?.identityVerified || sitter?.avatarUrl?.trim() || owner?.avatarUrl?.trim());
        const experienceVerified = sitter
            ? sitter.yearsExperience >= 2
            : (owner?._count.pets ?? 0) > 0;
        const referenceVerified = sitter
            ? sitter.reviewCount >= 5 || sitter.repeatClientRate >= 40
            : (owner?._count.reviews ?? 0) > 0;
        const checks = [phoneVerified, identityVerified, experienceVerified, referenceVerified];
        const score = checks.filter(Boolean).length * 25;
        return {
            level: this.toQualityTier(score),
            score,
        };
    }
    computeListingQuality(listing, verificationLevel) {
        let score = 0;
        const reasons = [];
        if (listing.title.trim().length >= 12) {
            score += 15;
        }
        else if (listing.title.trim().length >= MIN_TITLE_LENGTH) {
            score += 8;
        }
        else {
            reasons.push('Baslik daha acik olmali.');
        }
        if (listing.description.trim().length >= 80) {
            score += 30;
        }
        else if (listing.description.trim().length >= MIN_DESCRIPTION_LENGTH) {
            score += 18;
        }
        else {
            reasons.push('Aciklama minimum 40 karakter olmali.');
        }
        if (listing.city.trim() && listing.district.trim()) {
            score += 10;
        }
        else {
            reasons.push('Konum bilgisi net degil.');
        }
        if (listing.listingType === client_1.ListingType.OWNER_REQUEST) {
            if (listing.budgetPerDay !== null) {
                score += 12;
            }
            else {
                reasons.push('Gunluk butce belirtilmeli.');
            }
        }
        if (listing.listingType === client_1.ListingType.SITTER_SERVICE) {
            if (listing.servicePricePerDay !== null) {
                score += 12;
            }
            else {
                reasons.push('Gunluk hizmet ucreti belirtilmeli.');
            }
            if (listing.serviceUnit && listing.serviceIcon) {
                score += 5;
            }
            if ((listing.publishedByUser.sitterProfile?.galleryImageUrls.length ?? 0) > 0) {
                score += 6;
            }
        }
        if (listing.publishedByUser.activeLocation) {
            score += 10;
        }
        else {
            reasons.push('Canli konum paylasimi yok.');
        }
        if (listing.isFeatured) {
            score += 4;
        }
        if (verificationLevel === 'HIGH') {
            score += 18;
        }
        else if (verificationLevel === 'MEDIUM') {
            score += 12;
        }
        else {
            score += 6;
        }
        const normalizedScore = Math.min(100, score);
        return {
            score: normalizedScore,
            tier: this.toQualityTier(normalizedScore),
            reasons: reasons.slice(0, 4),
        };
    }
    toQualityTier(score) {
        if (score >= 75) {
            return 'HIGH';
        }
        if (score >= 50) {
            return 'MEDIUM';
        }
        return 'LOW';
    }
};
exports.ListingsService = ListingsService;
exports.ListingsService = ListingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ListingsService);
//# sourceMappingURL=listings.service.js.map