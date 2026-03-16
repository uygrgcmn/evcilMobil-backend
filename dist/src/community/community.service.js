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
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const CommunityListingCategory = {
    ADOPTION: 'ADOPTION',
    FOOD_SUPPORT: 'FOOD_SUPPORT',
};
const CommunityListingStatus = {
    OPEN: 'OPEN',
    CLOSED: 'CLOSED',
};
const CommunityPublisherType = {
    INDIVIDUAL: 'INDIVIDUAL',
    SHELTER: 'SHELTER',
};
const CommunityUrgency = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
};
const DEFAULT_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDThyF0EYnJ3ZnKmYgt4cP42ur-vsIuOdcO17z8lrIN2MDiRZDH0JYyOWw7xh8e85G8xQSaCaKcohWmFezVBQH5KWnSmQzaX8zqD1A7SGvd4wxeabtIq_eXX-ebjqf1lijEJTXz_lHwClK55jBM0nayds8O7NNH7F1VyNH6zVhskiiMffYd71IOrK_FUmvyu6eS4D8mE6GlC3QXlTezuTEjjRBvVeB6LwMxCnBTwOd-PL3oueWzlCRaF2g-9wlfJ7xpu9IM76USpdr4';
const COMMUNITY_LISTING_INCLUDE = {
    publishedByUser: {
        select: {
            id: true,
            email: true,
            role: true,
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
    applications: {
        select: {
            id: true,
            status: true,
        },
    },
};
const COMMUNITY_APPLICATION_INCLUDE = {
    listing: {
        select: {
            id: true,
            title: true,
            category: true,
            status: true,
            city: true,
            district: true,
            publisherType: true,
            organizationName: true,
            publishedByUserId: true,
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
        const category = this.parseCategory(filters.category, true);
        const publisherType = this.parsePublisherType(filters.publisherType, true);
        const listings = await this.prisma.communityListing.findMany({
            where: {
                category: category ?? undefined,
                status: filters.includeClosed ? undefined : CommunityListingStatus.OPEN,
                city: this.optionalText(filters.city)
                    ? { equals: this.optionalText(filters.city), mode: 'insensitive' }
                    : undefined,
                district: this.optionalText(filters.district)
                    ? { equals: this.optionalText(filters.district), mode: 'insensitive' }
                    : undefined,
                publisherType: publisherType ?? undefined,
            },
            include: COMMUNITY_LISTING_INCLUDE,
            orderBy: [{ updatedAt: 'desc' }],
            take: 100,
        });
        const mapped = listings.map((listing) => this.mapListing(listing));
        return mapped.sort((a, b) => {
            if (a.qualityScore !== b.qualityScore) {
                return b.qualityScore - a.qualityScore;
            }
            if (a.pendingApplicationCount !== b.pendingApplicationCount) {
                return b.pendingApplicationCount - a.pendingApplicationCount;
            }
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        });
    }
    async getAdoptionFeed(filters = {}) {
        return this.getFeed({
            ...filters,
            category: CommunityListingCategory.ADOPTION,
        });
    }
    async getFoodSupportFeed(filters = {}) {
        return this.getFeed({
            ...filters,
            category: CommunityListingCategory.FOOD_SUPPORT,
        });
    }
    async getMyListings(user) {
        const listings = await this.prisma.communityListing.findMany({
            where: {
                publishedByUserId: user.id,
            },
            include: COMMUNITY_LISTING_INCLUDE,
            orderBy: [{ updatedAt: 'desc' }],
        });
        return listings.map((listing) => this.mapListing(listing));
    }
    async getById(id) {
        const listing = await this.prisma.communityListing.findUnique({
            where: { id },
            include: COMMUNITY_LISTING_INCLUDE,
        });
        if (!listing) {
            throw new common_1.NotFoundException('Community listing not found');
        }
        return this.mapListing(listing);
    }
    async getSitterLeads(listingId, rawLimit) {
        const listing = await this.prisma.communityListing.findUnique({
            where: { id: listingId },
            select: {
                id: true,
                city: true,
                district: true,
            },
        });
        if (!listing) {
            throw new common_1.NotFoundException('Community listing not found');
        }
        let limit = 8;
        if (rawLimit?.trim()) {
            const parsed = Number(rawLimit);
            if (!Number.isFinite(parsed) || parsed < 1 || parsed > 20) {
                throw new common_1.BadRequestException('limit must be between 1 and 20');
            }
            limit = Math.floor(parsed);
        }
        const baseInclude = {
            user: {
                select: {
                    id: true,
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
            listings: {
                where: {
                    isActive: true,
                    listingType: client_1.ListingType.SITTER_SERVICE,
                },
                select: {
                    id: true,
                    updatedAt: true,
                },
                orderBy: {
                    updatedAt: 'desc',
                },
                take: 1,
            },
        };
        const districtSitters = await this.prisma.sitter.findMany({
            where: {
                city: {
                    equals: listing.city,
                    mode: 'insensitive',
                },
                district: {
                    equals: listing.district,
                    mode: 'insensitive',
                },
            },
            include: baseInclude,
            orderBy: [{ isFeatured: 'desc' }, { rating: 'desc' }, { reviewCount: 'desc' }],
            take: limit,
        });
        let sitters = districtSitters;
        if (sitters.length < limit) {
            const remaining = limit - sitters.length;
            const cityFallback = await this.prisma.sitter.findMany({
                where: {
                    city: {
                        equals: listing.city,
                        mode: 'insensitive',
                    },
                    district: {
                        not: listing.district,
                    },
                },
                include: baseInclude,
                orderBy: [{ isFeatured: 'desc' }, { rating: 'desc' }, { reviewCount: 'desc' }],
                take: remaining,
            });
            sitters = [...sitters, ...cityFallback];
        }
        return {
            listingId: listing.id,
            city: listing.city,
            district: listing.district,
            sitters: sitters.map((sitter) => ({
                id: sitter.id,
                fullName: sitter.fullName,
                city: sitter.city,
                district: sitter.district,
                primaryListingId: sitter.listings[0]?.id ?? null,
                rating: sitter.rating,
                reviewCount: sitter.reviewCount,
                pricePerDay: sitter.pricePerDay,
                pricePerHour: sitter.pricePerHour,
                avatarUrl: sitter.avatarUrl,
                isFeatured: sitter.isFeatured,
                tags: sitter.tags,
                verificationLevel: this.resolveSitterVerificationLevel(sitter),
                latitude: sitter.user?.activeLocation?.latitude ?? null,
                longitude: sitter.user?.activeLocation?.longitude ?? null,
                locationAccuracy: sitter.user?.activeLocation?.accuracy ?? null,
                locationLastSharedAt: sitter.user?.activeLocation?.lastSharedAt ?? null,
            })),
        };
    }
    async createListing(user, input) {
        const category = this.requireCategory(input.category);
        const publisherType = this.parsePublisherType(input.publisherType, true) ?? CommunityPublisherType.INDIVIDUAL;
        const urgency = this.parseUrgency(input.urgency, true) ?? CommunityUrgency.MEDIUM;
        const title = this.validateText(input.title, 'title');
        const description = this.validateText(input.description, 'description');
        const city = this.validateText(input.city, 'city');
        const district = this.validateText(input.district, 'district');
        const imageUrls = this.normalizeStringArray(input.imageUrls);
        if (description.length < 40) {
            throw new common_1.BadRequestException('description must be at least 40 characters');
        }
        if (imageUrls.length === 0) {
            throw new common_1.BadRequestException('At least one image is required for community listings');
        }
        if (publisherType === CommunityPublisherType.SHELTER &&
            !this.optionalText(input.organizationName)) {
            throw new common_1.BadRequestException('organizationName is required for SHELTER listings');
        }
        if (category === CommunityListingCategory.ADOPTION) {
            if (!this.optionalText(input.animalType)) {
                throw new common_1.BadRequestException('animalType is required for adoption listings');
            }
        }
        if (category === CommunityListingCategory.FOOD_SUPPORT) {
            if (!this.optionalText(input.quantityNeeded)) {
                throw new common_1.BadRequestException('quantityNeeded is required for food support listings');
            }
        }
        const created = await this.prisma.communityListing.create({
            data: {
                title,
                description,
                category,
                status: CommunityListingStatus.OPEN,
                city,
                district,
                publisherType,
                organizationName: this.optionalText(input.organizationName),
                contactPhone: this.optionalText(input.contactPhone),
                imageUrls,
                animalName: this.optionalText(input.animalName),
                animalType: this.optionalText(input.animalType),
                breed: this.optionalText(input.breed),
                ageText: this.optionalText(input.ageText),
                gender: this.optionalText(input.gender),
                size: this.optionalText(input.size),
                healthNotes: this.optionalText(input.healthNotes),
                houseRules: this.optionalText(input.houseRules),
                adoptionNotes: this.optionalText(input.adoptionNotes),
                quantityNeeded: this.optionalText(input.quantityNeeded),
                preferredFoodBrand: this.optionalText(input.preferredFoodBrand),
                supportDetails: this.optionalText(input.supportDetails),
                urgency,
                publishedByUserId: user.id,
            },
            include: COMMUNITY_LISTING_INCLUDE,
        });
        return this.mapListing(created);
    }
    async createAdoptionListing(user, input) {
        return this.createListing(user, {
            ...input,
            category: CommunityListingCategory.ADOPTION,
        });
    }
    async createFoodSupportListing(user, input) {
        return this.createListing(user, {
            ...input,
            category: CommunityListingCategory.FOOD_SUPPORT,
        });
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
            include: COMMUNITY_APPLICATION_INCLUDE,
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
            include: COMMUNITY_APPLICATION_INCLUDE,
            orderBy: [{ createdAt: 'desc' }],
        });
        return applications.map((application) => this.mapApplication(application));
    }
    async createApplication(user, input) {
        const listingId = this.validateText(input.listingId, 'listingId');
        const listing = await this.prisma.communityListing.findUnique({
            where: { id: listingId },
            select: {
                id: true,
                category: true,
                status: true,
                publishedByUserId: true,
            },
        });
        if (!listing) {
            throw new common_1.NotFoundException('Community listing not found');
        }
        if (listing.status !== CommunityListingStatus.OPEN) {
            throw new common_1.BadRequestException('Listing is closed');
        }
        if (listing.publishedByUserId === user.id) {
            throw new common_1.BadRequestException('You cannot apply to your own listing');
        }
        const existing = await this.prisma.communityApplication.findFirst({
            where: {
                listingId,
                applicantId: user.id,
                status: {
                    in: [client_1.ApplicationStatus.PENDING, client_1.ApplicationStatus.ACCEPTED],
                },
            },
            select: { id: true },
        });
        if (existing) {
            throw new common_1.BadRequestException('You already have an active application for this listing');
        }
        if (listing.category === CommunityListingCategory.FOOD_SUPPORT &&
            !this.optionalText(input.offeredQuantity)) {
            throw new common_1.BadRequestException('offeredQuantity is required for food support applications');
        }
        const created = await this.prisma.communityApplication.create({
            data: {
                listingId,
                applicantId: user.id,
                message: this.optionalText(input.message),
                contactPhone: this.optionalText(input.contactPhone),
                offeredQuantity: this.optionalText(input.offeredQuantity),
            },
            include: COMMUNITY_APPLICATION_INCLUDE,
        });
        return this.mapApplication(created);
    }
    async decideApplication(user, applicationId, rawAction) {
        const action = this.parseDecision(rawAction);
        const application = await this.prisma.communityApplication.findUnique({
            where: { id: applicationId },
            include: COMMUNITY_APPLICATION_INCLUDE,
        });
        if (!application) {
            throw new common_1.NotFoundException('Community application not found');
        }
        if (application.listing.publishedByUserId !== user.id) {
            throw new common_1.ForbiddenException('Only listing owner can decide this application');
        }
        if (application.status !== client_1.ApplicationStatus.PENDING) {
            throw new common_1.BadRequestException('Only pending applications can be decided');
        }
        if (action === 'REJECT') {
            const rejected = await this.prisma.communityApplication.update({
                where: { id: application.id },
                data: { status: client_1.ApplicationStatus.REJECTED },
                include: COMMUNITY_APPLICATION_INCLUDE,
            });
            return this.mapApplication(rejected);
        }
        await this.prisma.$transaction(async (tx) => {
            const transaction = tx;
            await transaction.communityApplication.update({
                where: { id: application.id },
                data: { status: client_1.ApplicationStatus.ACCEPTED },
            });
            await transaction.communityApplication.updateMany({
                where: {
                    listingId: application.listingId,
                    id: { not: application.id },
                    status: client_1.ApplicationStatus.PENDING,
                },
                data: { status: client_1.ApplicationStatus.REJECTED },
            });
            await transaction.communityListing.update({
                where: { id: application.listingId },
                data: { status: CommunityListingStatus.CLOSED },
            });
        });
        const updated = await this.prisma.communityApplication.findUnique({
            where: { id: application.id },
            include: COMMUNITY_APPLICATION_INCLUDE,
        });
        if (!updated) {
            throw new common_1.NotFoundException('Community application not found after update');
        }
        return this.mapApplication(updated);
    }
    async cancelApplication(user, applicationId) {
        const application = await this.prisma.communityApplication.findUnique({
            where: { id: applicationId },
            include: COMMUNITY_APPLICATION_INCLUDE,
        });
        if (!application) {
            throw new common_1.NotFoundException('Community application not found');
        }
        const isApplicant = application.applicantId === user.id;
        const isListingOwner = application.listing.publishedByUserId === user.id;
        if (!isApplicant && !isListingOwner) {
            throw new common_1.ForbiddenException('Not allowed to cancel this application');
        }
        if (application.status === client_1.ApplicationStatus.CANCELLED ||
            application.status === client_1.ApplicationStatus.REJECTED) {
            throw new common_1.BadRequestException('Application is already closed');
        }
        await this.prisma.$transaction(async (tx) => {
            const transaction = tx;
            await transaction.communityApplication.update({
                where: { id: application.id },
                data: { status: client_1.ApplicationStatus.CANCELLED },
            });
            if (application.status === client_1.ApplicationStatus.ACCEPTED) {
                const remainingAccepted = await transaction.communityApplication.count({
                    where: {
                        listingId: application.listingId,
                        status: client_1.ApplicationStatus.ACCEPTED,
                        id: { not: application.id },
                    },
                });
                if (remainingAccepted === 0) {
                    await transaction.communityListing.update({
                        where: { id: application.listingId },
                        data: { status: CommunityListingStatus.OPEN },
                    });
                }
            }
        });
        const updated = await this.prisma.communityApplication.findUnique({
            where: { id: application.id },
            include: COMMUNITY_APPLICATION_INCLUDE,
        });
        if (!updated) {
            throw new common_1.NotFoundException('Community application not found after cancel');
        }
        return this.mapApplication(updated);
    }
    mapListing(listing) {
        const acceptedApplication = listing.applications.find((application) => application.status === client_1.ApplicationStatus.ACCEPTED) ?? null;
        const verificationLevel = this.resolvePublisherVerificationLevel(listing.publishedByUser);
        const quality = this.computeCommunityQuality(listing, verificationLevel);
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
            pendingApplicationCount: listing.applications.filter((application) => application.status === client_1.ApplicationStatus.PENDING).length,
            acceptedApplicationId: acceptedApplication?.id ?? null,
            publisherVerificationLevel: verificationLevel,
            qualityScore: quality.score,
            qualityTier: quality.tier,
            qualityReasons: quality.reasons,
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
            listingId: application.listingId,
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
        const profileName = user.ownerProfile?.fullName ?? user.sitterProfile?.fullName ?? null;
        if (profileName && profileName.trim()) {
            return profileName.trim();
        }
        const emailPrefix = user.email.split('@')[0] ?? user.email;
        return emailPrefix || 'Kullanici';
    }
    getUserAvatar(user) {
        const avatar = user.ownerProfile?.avatarUrl ?? user.sitterProfile?.avatarUrl ?? null;
        if (avatar && avatar.trim()) {
            return avatar.trim();
        }
        return DEFAULT_AVATAR;
    }
    resolvePublisherVerificationLevel(publisher) {
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
        const passed = checks.filter(Boolean).length;
        if (passed >= 4) {
            return 'HIGH';
        }
        if (passed >= 2) {
            return 'MEDIUM';
        }
        return 'LOW';
    }
    resolveSitterVerificationLevel(input) {
        const checks = [
            input.identityVerified || Boolean(input.avatarUrl?.trim()),
            input.yearsExperience >= 2,
            input.reviewCount >= 5 || input.repeatClientRate >= 40,
        ];
        const passed = checks.filter(Boolean).length;
        if (passed >= 3) {
            return 'HIGH';
        }
        if (passed >= 2) {
            return 'MEDIUM';
        }
        return 'LOW';
    }
    computeCommunityQuality(listing, verificationLevel) {
        let score = 0;
        const reasons = [];
        if (listing.title.trim().length >= 10) {
            score += 14;
        }
        else {
            score += 6;
            reasons.push('Baslik daha acik yazilmali.');
        }
        if (listing.description.trim().length >= 90) {
            score += 30;
        }
        else if (listing.description.trim().length >= 40) {
            score += 20;
        }
        else {
            score += 8;
            reasons.push('Aciklama daha detayli olmali (min 40 karakter).');
        }
        if (listing.imageUrls.length >= 3) {
            score += 20;
        }
        else if (listing.imageUrls.length > 0) {
            score += 12;
            reasons.push('Daha fazla gorsel guveni arttirir.');
        }
        else {
            reasons.push('En az bir gorsel eklenmeli.');
        }
        if (listing.city.trim() && listing.district.trim()) {
            score += 8;
        }
        if (listing.contactPhone?.trim()) {
            score += 10;
        }
        else {
            reasons.push('Iletisim telefonu eklemek donusumu artirir.');
        }
        if (listing.publisherType === CommunityPublisherType.SHELTER) {
            if (listing.organizationName?.trim()) {
                score += 8;
            }
            else {
                reasons.push('Kurum adi belirtilmeli.');
            }
        }
        if (listing.category === CommunityListingCategory.ADOPTION) {
            if (listing.animalType?.trim()) {
                score += 4;
            }
            if (listing.animalName?.trim()) {
                score += 4;
            }
            if (listing.healthNotes?.trim()) {
                score += 4;
            }
            if (listing.houseRules?.trim()) {
                score += 4;
            }
        }
        if (listing.category === CommunityListingCategory.FOOD_SUPPORT) {
            if (listing.quantityNeeded?.trim()) {
                score += 5;
            }
            if (listing.preferredFoodBrand?.trim()) {
                score += 3;
            }
            if (listing.supportDetails?.trim()) {
                score += 4;
            }
        }
        if (verificationLevel === 'HIGH') {
            score += 16;
        }
        else if (verificationLevel === 'MEDIUM') {
            score += 10;
        }
        else {
            score += 5;
        }
        if (listing.status === CommunityListingStatus.OPEN) {
            score += 3;
        }
        const normalized = Math.min(100, score);
        return {
            score: normalized,
            tier: this.toCommunityQualityTier(normalized),
            reasons: reasons.slice(0, 4),
        };
    }
    toCommunityQualityTier(score) {
        if (score >= 75) {
            return 'HIGH';
        }
        if (score >= 50) {
            return 'MEDIUM';
        }
        return 'LOW';
    }
    requireCategory(rawCategory) {
        const category = this.parseCategory(rawCategory, false);
        if (!category) {
            throw new common_1.BadRequestException('category is required');
        }
        return category;
    }
    parseCategory(rawCategory, allowEmpty = false) {
        if (!rawCategory) {
            if (allowEmpty) {
                return null;
            }
            throw new common_1.BadRequestException('category is required');
        }
        const normalized = rawCategory.trim().toUpperCase();
        if (normalized === CommunityListingCategory.ADOPTION) {
            return CommunityListingCategory.ADOPTION;
        }
        if (normalized === CommunityListingCategory.FOOD_SUPPORT) {
            return CommunityListingCategory.FOOD_SUPPORT;
        }
        throw new common_1.BadRequestException('category must be ADOPTION or FOOD_SUPPORT');
    }
    parsePublisherType(rawPublisherType, allowEmpty = false) {
        if (!rawPublisherType) {
            return allowEmpty ? null : CommunityPublisherType.INDIVIDUAL;
        }
        const normalized = rawPublisherType.trim().toUpperCase();
        if (normalized === CommunityPublisherType.INDIVIDUAL) {
            return CommunityPublisherType.INDIVIDUAL;
        }
        if (normalized === CommunityPublisherType.SHELTER) {
            return CommunityPublisherType.SHELTER;
        }
        throw new common_1.BadRequestException('publisherType must be INDIVIDUAL or SHELTER');
    }
    parseUrgency(rawUrgency, allowEmpty = false) {
        if (!rawUrgency) {
            return allowEmpty ? null : CommunityUrgency.MEDIUM;
        }
        const normalized = rawUrgency.trim().toUpperCase();
        if (normalized === CommunityUrgency.LOW) {
            return CommunityUrgency.LOW;
        }
        if (normalized === CommunityUrgency.MEDIUM) {
            return CommunityUrgency.MEDIUM;
        }
        if (normalized === CommunityUrgency.HIGH) {
            return CommunityUrgency.HIGH;
        }
        throw new common_1.BadRequestException('urgency must be LOW, MEDIUM or HIGH');
    }
    parseStatus(rawStatus) {
        if (!rawStatus?.trim()) {
            return null;
        }
        const normalized = rawStatus.trim().toUpperCase();
        if (normalized === client_1.ApplicationStatus.PENDING) {
            return client_1.ApplicationStatus.PENDING;
        }
        if (normalized === client_1.ApplicationStatus.ACCEPTED) {
            return client_1.ApplicationStatus.ACCEPTED;
        }
        if (normalized === client_1.ApplicationStatus.REJECTED) {
            return client_1.ApplicationStatus.REJECTED;
        }
        if (normalized === client_1.ApplicationStatus.CANCELLED) {
            return client_1.ApplicationStatus.CANCELLED;
        }
        throw new common_1.BadRequestException('status must be PENDING, ACCEPTED, REJECTED or CANCELLED');
    }
    parseDecision(rawAction) {
        const normalized = rawAction?.trim().toUpperCase();
        if (normalized === 'ACCEPT' || normalized === 'REJECT') {
            return normalized;
        }
        throw new common_1.BadRequestException('action must be ACCEPT or REJECT');
    }
    validateText(value, field) {
        if (!value || typeof value !== 'string' || !value.trim()) {
            throw new common_1.BadRequestException(`${field} is required`);
        }
        return value.trim();
    }
    optionalText(value) {
        if (typeof value !== 'string') {
            return null;
        }
        const normalized = value.trim();
        return normalized ? normalized : null;
    }
    normalizeStringArray(value) {
        if (!Array.isArray(value)) {
            return [];
        }
        const normalized = value
            .filter((item) => typeof item === 'string')
            .map((item) => item.trim())
            .filter((item) => Boolean(item));
        return normalized.slice(0, 12);
    }
};
exports.CommunityService = CommunityService;
exports.CommunityService = CommunityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommunityService);
//# sourceMappingURL=community.service.js.map