import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import {
    ApplicationStatus,
    ListingType,
} from '@prisma/client';
import type { AuthenticatedUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';

type FeedFilters = {
    category?: string;
    city?: string;
    district?: string;
    publisherType?: string;
    includeClosed?: boolean;
};

type CreateCommunityListingInput = {
    title?: string;
    description?: string;
    category?: string;
    city?: string;
    district?: string;
    publisherType?: string;
    organizationName?: string;
    contactPhone?: string;
    imageUrls?: string[];
    animalName?: string;
    animalType?: string;
    breed?: string;
    ageText?: string;
    gender?: string;
    size?: string;
    healthNotes?: string;
    houseRules?: string;
    adoptionNotes?: string;
    quantityNeeded?: string;
    preferredFoodBrand?: string;
    supportDetails?: string;
    urgency?: string;
};

type CreateCommunityApplicationInput = {
    listingId?: string;
    message?: string;
    contactPhone?: string;
    offeredQuantity?: string;
};

type VerificationLevel = 'LOW' | 'MEDIUM' | 'HIGH';

type CommunityQualityTier = 'LOW' | 'MEDIUM' | 'HIGH';

const CommunityListingCategory = {
    ADOPTION: 'ADOPTION',
    FOOD_SUPPORT: 'FOOD_SUPPORT',
} as const;

type CommunityListingCategory =
    (typeof CommunityListingCategory)[keyof typeof CommunityListingCategory];

const CommunityListingStatus = {
    OPEN: 'OPEN',
    CLOSED: 'CLOSED',
} as const;

type CommunityListingStatus =
    (typeof CommunityListingStatus)[keyof typeof CommunityListingStatus];

const CommunityPublisherType = {
    INDIVIDUAL: 'INDIVIDUAL',
    SHELTER: 'SHELTER',
} as const;

type CommunityPublisherType =
    (typeof CommunityPublisherType)[keyof typeof CommunityPublisherType];

const CommunityUrgency = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
} as const;

type CommunityUrgency = (typeof CommunityUrgency)[keyof typeof CommunityUrgency];

const DEFAULT_AVATAR =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDThyF0EYnJ3ZnKmYgt4cP42ur-vsIuOdcO17z8lrIN2MDiRZDH0JYyOWw7xh8e85G8xQSaCaKcohWmFezVBQH5KWnSmQzaX8zqD1A7SGvd4wxeabtIq_eXX-ebjqf1lijEJTXz_lHwClK55jBM0nayds8O7NNH7F1VyNH6zVhskiiMffYd71IOrK_FUmvyu6eS4D8mE6GlC3QXlTezuTEjjRBvVeB6LwMxCnBTwOd-PL3oueWzlCRaF2g-9wlfJ7xpu9IM76USpdr4';

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
} as const;

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
} as const;

type CommunityListingWithRelations = any;

type CommunityApplicationWithRelations = any;

@Injectable()
export class CommunityService {
    constructor(private readonly prisma: PrismaService) { }

    async getFeed(filters: FeedFilters) {
        const category = this.parseCategory(filters.category, true);
        const publisherType = this.parsePublisherType(filters.publisherType, true);

        const listings = await this.prisma.communityListing.findMany({
            where: {
                category: category ?? undefined,
                status: filters.includeClosed ? undefined : CommunityListingStatus.OPEN,
                city: this.optionalText(filters.city)
                    ? { equals: this.optionalText(filters.city)!, mode: 'insensitive' }
                    : undefined,
                district: this.optionalText(filters.district)
                    ? { equals: this.optionalText(filters.district)!, mode: 'insensitive' }
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

    async getAdoptionFeed(filters: Omit<FeedFilters, 'category'> = {}) {
        return this.getFeed({
            ...filters,
            category: CommunityListingCategory.ADOPTION,
        });
    }

    async getFoodSupportFeed(filters: Omit<FeedFilters, 'category'> = {}) {
        return this.getFeed({
            ...filters,
            category: CommunityListingCategory.FOOD_SUPPORT,
        });
    }

    async getMyListings(user: AuthenticatedUser) {
        const listings = await this.prisma.communityListing.findMany({
            where: {
                publishedByUserId: user.id,
            },
            include: COMMUNITY_LISTING_INCLUDE,
            orderBy: [{ updatedAt: 'desc' }],
        });

        return listings.map((listing) => this.mapListing(listing));
    }

    async getById(id: string) {
        const listing = await this.prisma.communityListing.findUnique({
            where: { id },
            include: COMMUNITY_LISTING_INCLUDE,
        });

        if (!listing) {
            throw new NotFoundException('Community listing not found');
        }

        return this.mapListing(listing);
    }

    async getSitterLeads(listingId: string, rawLimit?: string) {
        const listing = await this.prisma.communityListing.findUnique({
            where: { id: listingId },
            select: {
                id: true,
                city: true,
                district: true,
            },
        });

        if (!listing) {
            throw new NotFoundException('Community listing not found');
        }

        let limit = 8;

        if (rawLimit?.trim()) {
            const parsed = Number(rawLimit);

            if (!Number.isFinite(parsed) || parsed < 1 || parsed > 20) {
                throw new BadRequestException('limit must be between 1 and 20');
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
                    listingType: ListingType.SITTER_SERVICE,
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
        } as const;

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

    async createListing(user: AuthenticatedUser, input: CreateCommunityListingInput) {
        const category = this.requireCategory(input.category);
        const publisherType = this.parsePublisherType(input.publisherType, true) ?? CommunityPublisherType.INDIVIDUAL;
        const urgency = this.parseUrgency(input.urgency, true) ?? CommunityUrgency.MEDIUM;

        const title = this.validateText(input.title, 'title');
        const description = this.validateText(input.description, 'description');
        const city = this.validateText(input.city, 'city');
        const district = this.validateText(input.district, 'district');
        const imageUrls = this.normalizeStringArray(input.imageUrls);

        if (description.length < 40) {
            throw new BadRequestException('description must be at least 40 characters');
        }

        if (imageUrls.length === 0) {
            throw new BadRequestException('At least one image is required for community listings');
        }

        if (
            publisherType === CommunityPublisherType.SHELTER &&
            !this.optionalText(input.organizationName)
        ) {
            throw new BadRequestException('organizationName is required for SHELTER listings');
        }

        if (category === CommunityListingCategory.ADOPTION) {
            if (!this.optionalText(input.animalType)) {
                throw new BadRequestException('animalType is required for adoption listings');
            }
        }

        if (category === CommunityListingCategory.FOOD_SUPPORT) {
            if (!this.optionalText(input.quantityNeeded)) {
                throw new BadRequestException('quantityNeeded is required for food support listings');
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

    async createAdoptionListing(
        user: AuthenticatedUser,
        input: Omit<CreateCommunityListingInput, 'category'>,
    ) {
        return this.createListing(user, {
            ...input,
            category: CommunityListingCategory.ADOPTION,
        });
    }

    async createFoodSupportListing(
        user: AuthenticatedUser,
        input: Omit<CreateCommunityListingInput, 'category'>,
    ) {
        return this.createListing(user, {
            ...input,
            category: CommunityListingCategory.FOOD_SUPPORT,
        });
    }

    async getInbox(user: AuthenticatedUser, rawStatus?: string) {
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

    async getOutbox(user: AuthenticatedUser, rawStatus?: string) {
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

    async createApplication(user: AuthenticatedUser, input: CreateCommunityApplicationInput) {
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
            throw new NotFoundException('Community listing not found');
        }

        if (listing.status !== CommunityListingStatus.OPEN) {
            throw new BadRequestException('Listing is closed');
        }

        if (listing.publishedByUserId === user.id) {
            throw new BadRequestException('You cannot apply to your own listing');
        }

        const existing = await this.prisma.communityApplication.findFirst({
            where: {
                listingId,
                applicantId: user.id,
                status: {
                    in: [ApplicationStatus.PENDING, ApplicationStatus.ACCEPTED],
                },
            },
            select: { id: true },
        });

        if (existing) {
            throw new BadRequestException('You already have an active application for this listing');
        }

        if (
            listing.category === CommunityListingCategory.FOOD_SUPPORT &&
            !this.optionalText(input.offeredQuantity)
        ) {
            throw new BadRequestException('offeredQuantity is required for food support applications');
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

    async decideApplication(
        user: AuthenticatedUser,
        applicationId: string,
        rawAction?: string,
    ) {
        const action = this.parseDecision(rawAction);

        const application = await this.prisma.communityApplication.findUnique({
            where: { id: applicationId },
            include: COMMUNITY_APPLICATION_INCLUDE,
        });

        if (!application) {
            throw new NotFoundException('Community application not found');
        }

        if (application.listing.publishedByUserId !== user.id) {
            throw new ForbiddenException('Only listing owner can decide this application');
        }

        if (application.status !== ApplicationStatus.PENDING) {
            throw new BadRequestException('Only pending applications can be decided');
        }

        if (action === 'REJECT') {
            const rejected = await this.prisma.communityApplication.update({
                where: { id: application.id },
                data: { status: ApplicationStatus.REJECTED },
                include: COMMUNITY_APPLICATION_INCLUDE,
            });

            return this.mapApplication(rejected);
        }

        await this.prisma.$transaction(async (tx) => {
            const transaction = tx as any;

            await transaction.communityApplication.update({
                where: { id: application.id },
                data: { status: ApplicationStatus.ACCEPTED },
            });

            await transaction.communityApplication.updateMany({
                where: {
                    listingId: application.listingId,
                    id: { not: application.id },
                    status: ApplicationStatus.PENDING,
                },
                data: { status: ApplicationStatus.REJECTED },
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
            throw new NotFoundException('Community application not found after update');
        }

        return this.mapApplication(updated);
    }

    async cancelApplication(user: AuthenticatedUser, applicationId: string) {
        const application = await this.prisma.communityApplication.findUnique({
            where: { id: applicationId },
            include: COMMUNITY_APPLICATION_INCLUDE,
        });

        if (!application) {
            throw new NotFoundException('Community application not found');
        }

        const isApplicant = application.applicantId === user.id;
        const isListingOwner = application.listing.publishedByUserId === user.id;

        if (!isApplicant && !isListingOwner) {
            throw new ForbiddenException('Not allowed to cancel this application');
        }

        if (
            application.status === ApplicationStatus.CANCELLED ||
            application.status === ApplicationStatus.REJECTED
        ) {
            throw new BadRequestException('Application is already closed');
        }

        await this.prisma.$transaction(async (tx) => {
            const transaction = tx as any;

            await transaction.communityApplication.update({
                where: { id: application.id },
                data: { status: ApplicationStatus.CANCELLED },
            });

            if (application.status === ApplicationStatus.ACCEPTED) {
                const remainingAccepted = await transaction.communityApplication.count({
                    where: {
                        listingId: application.listingId,
                        status: ApplicationStatus.ACCEPTED,
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
            throw new NotFoundException('Community application not found after cancel');
        }

        return this.mapApplication(updated);
    }

    private mapListing(listing: CommunityListingWithRelations) {
        const acceptedApplication =
            listing.applications.find((application) => application.status === ApplicationStatus.ACCEPTED) ?? null;
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
            pendingApplicationCount: listing.applications.filter(
                (application) => application.status === ApplicationStatus.PENDING,
            ).length,
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

    private mapApplication(application: CommunityApplicationWithRelations) {
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

    private getUserDisplayName(user: {
        email: string;
        ownerProfile: { fullName: string } | null;
        sitterProfile: { fullName: string } | null;
    }) {
        const profileName = user.ownerProfile?.fullName ?? user.sitterProfile?.fullName ?? null;

        if (profileName && profileName.trim()) {
            return profileName.trim();
        }

        const emailPrefix = user.email.split('@')[0] ?? user.email;
        return emailPrefix || 'Kullanici';
    }

    private getUserAvatar(user: {
        ownerProfile: { avatarUrl: string } | null;
        sitterProfile: { avatarUrl: string } | null;
    }) {
        const avatar = user.ownerProfile?.avatarUrl ?? user.sitterProfile?.avatarUrl ?? null;

        if (avatar && avatar.trim()) {
            return avatar.trim();
        }

        return DEFAULT_AVATAR;
    }

    private resolvePublisherVerificationLevel(
        publisher: CommunityListingWithRelations['publishedByUser'],
    ): VerificationLevel {
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

    private resolveSitterVerificationLevel(input: {
        identityVerified: boolean;
        yearsExperience: number;
        reviewCount: number;
        repeatClientRate: number;
        avatarUrl: string;
    }): VerificationLevel {
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

    private computeCommunityQuality(
        listing: CommunityListingWithRelations,
        verificationLevel: VerificationLevel,
    ): { score: number; tier: CommunityQualityTier; reasons: string[] } {
        let score = 0;
        const reasons: string[] = [];

        if (listing.title.trim().length >= 10) {
            score += 14;
        } else {
            score += 6;
            reasons.push('Baslik daha acik yazilmali.');
        }

        if (listing.description.trim().length >= 90) {
            score += 30;
        } else if (listing.description.trim().length >= 40) {
            score += 20;
        } else {
            score += 8;
            reasons.push('Aciklama daha detayli olmali (min 40 karakter).');
        }

        if (listing.imageUrls.length >= 3) {
            score += 20;
        } else if (listing.imageUrls.length > 0) {
            score += 12;
            reasons.push('Daha fazla gorsel guveni arttirir.');
        } else {
            reasons.push('En az bir gorsel eklenmeli.');
        }

        if (listing.city.trim() && listing.district.trim()) {
            score += 8;
        }

        if (listing.contactPhone?.trim()) {
            score += 10;
        } else {
            reasons.push('Iletisim telefonu eklemek donusumu artirir.');
        }

        if (listing.publisherType === CommunityPublisherType.SHELTER) {
            if (listing.organizationName?.trim()) {
                score += 8;
            } else {
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
        } else if (verificationLevel === 'MEDIUM') {
            score += 10;
        } else {
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

    private toCommunityQualityTier(score: number): CommunityQualityTier {
        if (score >= 75) {
            return 'HIGH';
        }

        if (score >= 50) {
            return 'MEDIUM';
        }

        return 'LOW';
    }

    private requireCategory(rawCategory?: string): CommunityListingCategory {
        const category = this.parseCategory(rawCategory, false);

        if (!category) {
            throw new BadRequestException('category is required');
        }

        return category;
    }

    private parseCategory(
        rawCategory?: string,
        allowEmpty = false,
    ): CommunityListingCategory | null {
        if (!rawCategory) {
            if (allowEmpty) {
                return null;
            }

            throw new BadRequestException('category is required');
        }

        const normalized = rawCategory.trim().toUpperCase();

        if (normalized === CommunityListingCategory.ADOPTION) {
            return CommunityListingCategory.ADOPTION;
        }

        if (normalized === CommunityListingCategory.FOOD_SUPPORT) {
            return CommunityListingCategory.FOOD_SUPPORT;
        }

        throw new BadRequestException('category must be ADOPTION or FOOD_SUPPORT');
    }

    private parsePublisherType(
        rawPublisherType?: string,
        allowEmpty = false,
    ): CommunityPublisherType | null {
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

        throw new BadRequestException('publisherType must be INDIVIDUAL or SHELTER');
    }

    private parseUrgency(rawUrgency?: string, allowEmpty = false): CommunityUrgency | null {
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

        throw new BadRequestException('urgency must be LOW, MEDIUM or HIGH');
    }

    private parseStatus(rawStatus?: string): ApplicationStatus | null {
        if (!rawStatus?.trim()) {
            return null;
        }

        const normalized = rawStatus.trim().toUpperCase();

        if (normalized === ApplicationStatus.PENDING) {
            return ApplicationStatus.PENDING;
        }

        if (normalized === ApplicationStatus.ACCEPTED) {
            return ApplicationStatus.ACCEPTED;
        }

        if (normalized === ApplicationStatus.REJECTED) {
            return ApplicationStatus.REJECTED;
        }

        if (normalized === ApplicationStatus.CANCELLED) {
            return ApplicationStatus.CANCELLED;
        }

        throw new BadRequestException('status must be PENDING, ACCEPTED, REJECTED or CANCELLED');
    }

    private parseDecision(rawAction?: string): 'ACCEPT' | 'REJECT' {
        const normalized = rawAction?.trim().toUpperCase();

        if (normalized === 'ACCEPT' || normalized === 'REJECT') {
            return normalized;
        }

        throw new BadRequestException('action must be ACCEPT or REJECT');
    }

    private validateText(value: string | undefined, field: string): string {
        if (!value || typeof value !== 'string' || !value.trim()) {
            throw new BadRequestException(`${field} is required`);
        }

        return value.trim();
    }

    private optionalText(value?: string): string | null {
        if (typeof value !== 'string') {
            return null;
        }

        const normalized = value.trim();
        return normalized ? normalized : null;
    }

    private normalizeStringArray(value?: string[]): string[] {
        if (!Array.isArray(value)) {
            return [];
        }

        const normalized = value
            .filter((item): item is string => typeof item === 'string')
            .map((item) => item.trim())
            .filter((item) => Boolean(item));

        return normalized.slice(0, 12);
    }
}
