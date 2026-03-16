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
exports.CommunityService = void 0;
const client_1 = require("@prisma/client");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const communityListingInclude = {
    publishedByUser: {
        select: {
            id: true,
            email: true,
            role: true,
            ownerProfile: {
                select: {
                    fullName: true,
                    avatarUrl: true,
                },
            },
            sitterProfile: {
                select: {
                    fullName: true,
                    avatarUrl: true,
                },
            },
        },
    },
    applications: {
        select: {
            id: true,
            status: true,
        },
    },
};
const communityApplicationInclude = {
    listing: {
        include: {
            publishedByUser: {
                select: {
                    id: true,
                    email: true,
                    role: true,
                    ownerProfile: {
                        select: {
                            fullName: true,
                            avatarUrl: true,
                        },
                    },
                    sitterProfile: {
                        select: {
                            fullName: true,
                            avatarUrl: true,
                        },
                    },
                },
            },
        },
    },
    applicant: {
        select: {
            id: true,
            email: true,
            role: true,
            ownerProfile: {
                select: {
                    fullName: true,
                    avatarUrl: true,
                },
            },
            sitterProfile: {
                select: {
                    fullName: true,
                    avatarUrl: true,
                },
            },
        },
    },
};
let CommunityService = class CommunityService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getFeed(filters) {
        const category = this.parseCategory(filters.category);
        const publisherType = this.parsePublisherType(filters.publisherType);
        const listings = await this.prisma.communityListing.findMany({
            where: {
                category: category ?? undefined,
                publisherType: publisherType ?? undefined,
                city: filters.city?.trim()
                    ? { equals: filters.city.trim(), mode: 'insensitive' }
                    : undefined,
                district: filters.district?.trim()
                    ? { equals: filters.district.trim(), mode: 'insensitive' }
                    : undefined,
                status: filters.includeClosed ? undefined : client_1.CommunityListingStatus.OPEN,
            },
            include: communityListingInclude,
            orderBy: [
                { status: 'asc' },
                { urgency: 'desc' },
                { updatedAt: 'desc' },
            ],
            take: 50,
        });
        return listings.map((listing) => this.mapListing(listing));
    }
    async getMyListings(user) {
        const listings = await this.prisma.communityListing.findMany({
            where: {
                publishedByUserId: user.id,
            },
            include: communityListingInclude,
            orderBy: [{ status: 'asc' }, { updatedAt: 'desc' }],
        });
        return listings.map((listing) => this.mapListing(listing));
    }
    async getById(id) {
        const listing = await this.prisma.communityListing.findUnique({
            where: { id },
            include: communityListingInclude,
        });
        if (!listing) {
            throw new common_1.NotFoundException('Community listing not found');
        }
        return this.mapListing(listing);
    }
    async createListing(user, input) {
        const title = this.validateText(input.title, 'title');
        const description = this.validateText(input.description, 'description');
        const city = this.validateText(input.city, 'city');
        const district = this.validateText(input.district, 'district');
        const category = this.requireCategory(input.category);
        const publisherType = this.parsePublisherType(input.publisherType) ?? client_1.CommunityPublisherType.INDIVIDUAL;
        const organizationName = this.optionalText(input.organizationName, 120);
        const contactPhone = this.optionalText(input.contactPhone, 32);
        const urgency = this.parseUrgency(input.urgency) ?? client_1.CommunityUrgency.MEDIUM;
        const imageUrls = this.normalizeStringArray(input.imageUrls, 'imageUrls', 8, 4000);
        if (publisherType === client_1.CommunityPublisherType.SHELTER &&
            !organizationName) {
            throw new common_1.BadRequestException('organizationName is required for shelters');
        }
        const animalName = this.optionalText(input.animalName, 80);
        const animalType = this.optionalText(input.animalType, 80);
        const breed = this.optionalText(input.breed, 80);
        const ageText = this.optionalText(input.ageText, 80);
        const gender = this.optionalText(input.gender, 40);
        const size = this.optionalText(input.size, 40);
        const healthNotes = this.optionalText(input.healthNotes, 600);
        const houseRules = this.optionalText(input.houseRules, 600);
        const adoptionNotes = this.optionalText(input.adoptionNotes, 600);
        const quantityNeeded = this.optionalText(input.quantityNeeded, 120);
        const preferredFoodBrand = this.optionalText(input.preferredFoodBrand, 120);
        const supportDetails = this.optionalText(input.supportDetails, 600);
        if (category === client_1.CommunityListingCategory.ADOPTION) {
            if (!animalName) {
                throw new common_1.BadRequestException('animalName is required for adoption listings');
            }
            if (!animalType) {
                throw new common_1.BadRequestException('animalType is required for adoption listings');
            }
        }
        if (category === client_1.CommunityListingCategory.FOOD_SUPPORT && !quantityNeeded) {
            throw new common_1.BadRequestException('quantityNeeded is required for food support listings');
        }
        const created = await this.prisma.communityListing.create({
            data: {
                title,
                description,
                category,
                city,
                district,
                publisherType,
                organizationName,
                contactPhone,
                imageUrls,
                animalName,
                animalType,
                breed,
                ageText,
                gender,
                size,
                healthNotes,
                houseRules,
                adoptionNotes,
                quantityNeeded,
                preferredFoodBrand,
                supportDetails,
                urgency,
                publishedByUserId: user.id,
            },
            include: communityListingInclude,
        });
        return this.mapListing(created);
    }
    async getInbox(user, rawStatus) {
        const status = this.parseStatus(rawStatus);
        const applications = await this.prisma.communityApplication.findMany({
            where: {
                listing: {
                    publishedByUserId: user.id,
                },
                status: status ?? undefined,
            },
            include: communityApplicationInclude,
            orderBy: [{ createdAt: 'desc' }],
        });
        return applications.map((application) => this.mapApplication(application));
    }
    async getOutbox(user, rawStatus) {
        const status = this.parseStatus(rawStatus);
        const applications = await this.prisma.communityApplication.findMany({
            where: {
                applicantId: user.id,
                status: status ?? undefined,
            },
            include: communityApplicationInclude,
            orderBy: [{ createdAt: 'desc' }],
        });
        return applications.map((application) => this.mapApplication(application));
    }
    async createApplication(user, input) {
        if (typeof input.listingId !== 'string' || !input.listingId.trim()) {
            throw new common_1.BadRequestException('listingId is required');
        }
        const listingId = input.listingId.trim();
        const listing = await this.prisma.communityListing.findUnique({
            where: { id: listingId },
            select: {
                id: true,
                title: true,
                category: true,
                status: true,
                publishedByUserId: true,
            },
        });
        if (!listing) {
            throw new common_1.NotFoundException('Community listing not found');
        }
        if (listing.status !== client_1.CommunityListingStatus.OPEN) {
            throw new common_1.BadRequestException('Listing is closed');
        }
        if (listing.publishedByUserId === user.id) {
            throw new common_1.BadRequestException('You cannot apply to your own listing');
        }
        const existingActiveApplication = await this.prisma.communityApplication.findFirst({
            where: {
                listingId: listing.id,
                applicantId: user.id,
                status: {
                    in: [client_1.ApplicationStatus.PENDING, client_1.ApplicationStatus.ACCEPTED],
                },
            },
            select: { id: true },
        });
        if (existingActiveApplication) {
            throw new common_1.BadRequestException('You already have an active application for this listing');
        }
        const created = await this.prisma.communityApplication.create({
            data: {
                listingId: listing.id,
                applicantId: user.id,
                message: this.optionalText(input.message, 800),
                contactPhone: this.optionalText(input.contactPhone, 32),
                offeredQuantity: this.optionalText(input.offeredQuantity, 120),
            },
            include: communityApplicationInclude,
        });
        return this.mapApplication(created);
    }
    async decideApplication(user, applicationId, rawAction) {
        const action = this.parseDecision(rawAction);
        const application = await this.prisma.communityApplication.findUnique({
            where: { id: applicationId },
            include: communityApplicationInclude,
        });
        if (!application) {
            throw new common_1.NotFoundException('Community application not found');
        }
        if (application.listing.publishedByUserId !== user.id) {
            throw new common_1.ForbiddenException('Only listing publisher can decide this application');
        }
        if (application.status !== client_1.ApplicationStatus.PENDING) {
            throw new common_1.BadRequestException('Only pending applications can be decided');
        }
        if (action === 'REJECT') {
            const rejected = await this.prisma.communityApplication.update({
                where: { id: application.id },
                data: { status: client_1.ApplicationStatus.REJECTED },
                include: communityApplicationInclude,
            });
            return this.mapApplication(rejected);
        }
        await this.prisma.$transaction(async (tx) => {
            const acceptedForListing = await tx.communityApplication.findFirst({
                where: {
                    listingId: application.listingId,
                    status: client_1.ApplicationStatus.ACCEPTED,
                    id: { not: application.id },
                },
                select: { id: true },
            });
            if (acceptedForListing) {
                throw new common_1.BadRequestException('Another application is already accepted for this listing');
            }
            await tx.communityApplication.update({
                where: { id: application.id },
                data: { status: client_1.ApplicationStatus.ACCEPTED },
            });
            await tx.communityApplication.updateMany({
                where: {
                    listingId: application.listingId,
                    id: { not: application.id },
                    status: client_1.ApplicationStatus.PENDING,
                },
                data: { status: client_1.ApplicationStatus.REJECTED },
            });
            await tx.communityListing.update({
                where: { id: application.listingId },
                data: { status: client_1.CommunityListingStatus.CLOSED },
            });
        });
        const updated = await this.prisma.communityApplication.findUnique({
            where: { id: application.id },
            include: communityApplicationInclude,
        });
        if (!updated) {
            throw new common_1.NotFoundException('Community application not found after update');
        }
        return this.mapApplication(updated);
    }
    async cancelApplication(user, applicationId) {
        const application = await this.prisma.communityApplication.findUnique({
            where: { id: applicationId },
            include: communityApplicationInclude,
        });
        if (!application) {
            throw new common_1.NotFoundException('Community application not found');
        }
        const isApplicant = application.applicantId === user.id;
        const isPublisher = application.listing.publishedByUserId === user.id;
        if (!isApplicant && !isPublisher) {
            throw new common_1.ForbiddenException('Not allowed to cancel this application');
        }
        if (application.status === client_1.ApplicationStatus.CANCELLED ||
            application.status === client_1.ApplicationStatus.REJECTED) {
            throw new common_1.BadRequestException('Application is already closed');
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.communityApplication.update({
                where: { id: application.id },
                data: { status: client_1.ApplicationStatus.CANCELLED },
            });
            if (application.status === client_1.ApplicationStatus.ACCEPTED) {
                const remainingAccepted = await tx.communityApplication.count({
                    where: {
                        listingId: application.listingId,
                        status: client_1.ApplicationStatus.ACCEPTED,
                        id: { not: application.id },
                    },
                });
                if (remainingAccepted === 0) {
                    await tx.communityListing.update({
                        where: { id: application.listingId },
                        data: { status: client_1.CommunityListingStatus.OPEN },
                    });
                }
            }
        });
        const updated = await this.prisma.communityApplication.findUnique({
            where: { id: application.id },
            include: communityApplicationInclude,
        });
        if (!updated) {
            throw new common_1.NotFoundException('Community application not found after cancel');
        }
        return this.mapApplication(updated);
    }
    mapListing(listing) {
        const pendingApplicationCount = listing.applications.filter((application) => application.status === client_1.ApplicationStatus.PENDING).length;
        const acceptedApplication = listing.applications.find((application) => application.status === client_1.ApplicationStatus.ACCEPTED);
        return {
            id: listing.id,
            title: listing.title,
            description: listing.description,
            category: listing.category,
            status: listing.status,
            city: listing.city,
            district: listing.district,
            publisherType: listing.publisherType,
            organizationName: listing.organizationName,
            contactPhone: listing.contactPhone,
            imageUrls: listing.imageUrls,
            animalName: listing.animalName,
            animalType: listing.animalType,
            breed: listing.breed,
            ageText: listing.ageText,
            gender: listing.gender,
            size: listing.size,
            healthNotes: listing.healthNotes,
            houseRules: listing.houseRules,
            adoptionNotes: listing.adoptionNotes,
            quantityNeeded: listing.quantityNeeded,
            preferredFoodBrand: listing.preferredFoodBrand,
            supportDetails: listing.supportDetails,
            urgency: listing.urgency,
            applicationCount: listing.applications.length,
            pendingApplicationCount,
            acceptedApplicationId: acceptedApplication?.id ?? null,
            createdAt: listing.createdAt,
            updatedAt: listing.updatedAt,
            publishedByUser: {
                id: listing.publishedByUser.id,
                email: listing.publishedByUser.email,
                role: listing.publishedByUser.role,
                fullName: this.getUserDisplayName(listing.publishedByUser),
                avatarUrl: this.getUserAvatar(listing.publishedByUser),
            },
        };
    }
    mapApplication(application) {
        return {
            id: application.id,
            listingId: application.listing.id,
            listingTitle: application.listing.title,
            listingCategory: application.listing.category,
            listingStatus: application.listing.status,
            city: application.listing.city,
            district: application.listing.district,
            publisherType: application.listing.publisherType,
            organizationName: application.listing.organizationName,
            message: application.message,
            contactPhone: application.contactPhone,
            offeredQuantity: application.offeredQuantity,
            status: application.status,
            createdAt: application.createdAt,
            updatedAt: application.updatedAt,
            applicant: {
                id: application.applicant.id,
                email: application.applicant.email,
                role: application.applicant.role,
                fullName: this.getUserDisplayName(application.applicant),
                avatarUrl: this.getUserAvatar(application.applicant),
            },
            listingOwner: {
                id: application.listing.publishedByUser.id,
                email: application.listing.publishedByUser.email,
                role: application.listing.publishedByUser.role,
                fullName: this.getUserDisplayName(application.listing.publishedByUser),
                avatarUrl: this.getUserAvatar(application.listing.publishedByUser),
            },
        };
    }
    getUserDisplayName(user) {
        return (user.ownerProfile?.fullName ||
            user.sitterProfile?.fullName ||
            user.email.split('@')[0] ||
            'User');
    }
    getUserAvatar(user) {
        return user.ownerProfile?.avatarUrl || user.sitterProfile?.avatarUrl || '';
    }
    requireCategory(raw) {
        const category = this.parseCategory(raw);
        if (!category) {
            throw new common_1.BadRequestException('category is required');
        }
        return category;
    }
    parseCategory(raw) {
        const normalized = raw?.trim().toUpperCase();
        if (!normalized) {
            return null;
        }
        if (normalized === 'ADOPTION') {
            return client_1.CommunityListingCategory.ADOPTION;
        }
        if (normalized === 'FOOD_SUPPORT') {
            return client_1.CommunityListingCategory.FOOD_SUPPORT;
        }
        throw new common_1.BadRequestException('Invalid community category');
    }
    parsePublisherType(raw) {
        const normalized = raw?.trim().toUpperCase();
        if (!normalized) {
            return null;
        }
        if (normalized === 'INDIVIDUAL') {
            return client_1.CommunityPublisherType.INDIVIDUAL;
        }
        if (normalized === 'SHELTER') {
            return client_1.CommunityPublisherType.SHELTER;
        }
        throw new common_1.BadRequestException('Invalid community publisher type');
    }
    parseUrgency(raw) {
        const normalized = raw?.trim().toUpperCase();
        if (!normalized) {
            return null;
        }
        if (normalized === 'LOW') {
            return client_1.CommunityUrgency.LOW;
        }
        if (normalized === 'MEDIUM') {
            return client_1.CommunityUrgency.MEDIUM;
        }
        if (normalized === 'HIGH') {
            return client_1.CommunityUrgency.HIGH;
        }
        throw new common_1.BadRequestException('Invalid community urgency');
    }
    parseStatus(raw) {
        const normalized = raw?.trim().toUpperCase();
        if (!normalized) {
            return null;
        }
        if (normalized === 'PENDING') {
            return client_1.ApplicationStatus.PENDING;
        }
        if (normalized === 'ACCEPTED') {
            return client_1.ApplicationStatus.ACCEPTED;
        }
        if (normalized === 'REJECTED') {
            return client_1.ApplicationStatus.REJECTED;
        }
        if (normalized === 'CANCELLED') {
            return client_1.ApplicationStatus.CANCELLED;
        }
        throw new common_1.BadRequestException('Invalid application status');
    }
    parseDecision(raw) {
        const normalized = raw?.trim().toUpperCase();
        if (normalized === 'ACCEPT') {
            return 'ACCEPT';
        }
        if (normalized === 'REJECT') {
            return 'REJECT';
        }
        throw new common_1.BadRequestException('action must be ACCEPT or REJECT');
    }
    validateText(value, field) {
        if (!value || typeof value !== 'string' || !value.trim()) {
            throw new common_1.BadRequestException(`${field} is required`);
        }
        return value.trim();
    }
    optionalText(value, maxLength) {
        if (value === undefined || value === null) {
            return null;
        }
        if (typeof value !== 'string') {
            throw new common_1.BadRequestException('Expected text value');
        }
        const normalized = value.trim();
        if (!normalized) {
            return null;
        }
        if (normalized.length > maxLength) {
            throw new common_1.BadRequestException(`Text value exceeds ${maxLength} characters`);
        }
        return normalized;
    }
    normalizeStringArray(value, field, maxItems, maxItemLength) {
        if (value === undefined) {
            return [];
        }
        if (!Array.isArray(value)) {
            throw new common_1.BadRequestException(`${field} must be an array`);
        }
        if (value.length > maxItems) {
            throw new common_1.BadRequestException(`${field} cannot contain more than ${maxItems} items`);
        }
        return value
            .map((item) => {
            if (typeof item !== 'string') {
                throw new common_1.BadRequestException(`${field} must contain only strings`);
            }
            const normalized = item.trim();
            if (normalized.length > maxItemLength) {
                throw new common_1.BadRequestException(`${field} item is too long`);
            }
            return normalized;
        })
            .filter(Boolean);
    }
};
exports.CommunityService = CommunityService;
exports.CommunityService = CommunityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommunityService);
//# sourceMappingURL=community.service.js.map