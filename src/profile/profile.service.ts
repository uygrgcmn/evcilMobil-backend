import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type UpdateProfileInput = {
    fullName?: string;
    city?: string;
    district?: string;
    about?: string;
    yearsExperience?: number;
    tags?: string[];
    pricePerDay?: number;
    pricePerHour?: number;
    galleryImageUrls?: string[];
};

type VerificationLevel = 'LOW' | 'MEDIUM' | 'HIGH';

type VerificationSummary = {
    phoneVerified: boolean;
    identityVerified: boolean;
    experienceVerified: boolean;
    referenceVerified: boolean;
    score: number;
    level: VerificationLevel;
};

@Injectable()
export class ProfileService {
    constructor(private readonly prisma: PrismaService) { }

    private readonly ownerProfileIncludes = {
        pets: true,
        badges: true,
        reviews: true,
    } as const;

    async getMe(userId: string) {
        await this.ensureUserProfiles(userId);

        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                role: true,
                ownerProfile: {
                    include: this.ownerProfileIncludes,
                },
                sitterProfile: {
                    include: {
                        listings: {
                            where: { isActive: true },
                            orderBy: [{ isFeatured: 'desc' }, { updatedAt: 'desc' }],
                            take: 10,
                            select: {
                                id: true,
                                title: true,
                                description: true,
                                servicePricePerDay: true,
                                serviceUnit: true,
                                serviceIcon: true,
                            },
                        },
                        reviews: {
                            orderBy: { createdAt: 'desc' },
                            take: 10,
                            select: {
                                id: true,
                                authorName: true,
                                authorAvatarUrl: true,
                                rating: true,
                                comment: true,
                                timeLabel: true,
                            },
                        },
                    },
                },
            },
        });

        if (!user || !user.ownerProfile || !user.sitterProfile) {
            throw new NotFoundException('Profile not found');
        }

        const ownerProfile = user.ownerProfile;
        const sitterProfile = user.sitterProfile;

        const [ownerVerification, sitterVerification] = await Promise.all([
            this.buildOwnerVerificationSummary(userId, {
                avatarUrl: ownerProfile.avatarUrl,
                fullName: ownerProfile.fullName,
                pets: ownerProfile.pets,
                reviews: ownerProfile.reviews,
            }),
            this.buildSitterVerificationSummary(userId, {
                avatarUrl: sitterProfile.avatarUrl,
                identityVerified: sitterProfile.identityVerified,
                yearsExperience: sitterProfile.yearsExperience,
                repeatClientRate: sitterProfile.repeatClientRate,
                reviews: sitterProfile.reviews,
            }),
        ]);

        const verification = this.mergeVerificationSummaries(ownerVerification, sitterVerification);
        const baseBadges = [
            ...ownerProfile.badges,
            ...this.buildSitterBadges(sitterProfile),
        ];

        const badges = this.mergeTrustBadges(baseBadges, verification);
        const services = sitterProfile.listings
            .filter((listing) => listing.servicePricePerDay !== null)
            .map((listing) => ({
                id: listing.id,
                title: listing.title,
                description: listing.description,
                price: listing.servicePricePerDay ?? 0,
                unit: listing.serviceUnit || '/day',
                icon: listing.serviceIcon || 'pets',
            }));

        const reviews = [
            ...ownerProfile.reviews.map((review) => ({
                id: review.id,
                authorName: review.authorName,
                authorAvatarUrl: review.authorAvatarUrl,
                rating: review.rating,
                comment: review.comment,
                timeLabel: undefined,
            })),
            ...sitterProfile.reviews.map((review) => ({
                id: review.id,
                authorName: review.authorName,
                authorAvatarUrl: review.authorAvatarUrl,
                rating: review.rating,
                comment: review.comment,
                timeLabel: review.timeLabel,
            })),
        ];

        return {
            id: user.id,
            userId: user.id,
            ownerProfileId: ownerProfile.id,
            sitterProfileId: sitterProfile.id,
            userRole: user.role,
            roleLabel: 'EvcilMobil Kullanicisi',
            fullName:
                ownerProfile.fullName ||
                sitterProfile.fullName ||
                user.email.split('@')[0] ||
                'Kullanici',
            district: ownerProfile.district || sitterProfile.district || '',
            city: ownerProfile.city || sitterProfile.city || '',
            avatarUrl: ownerProfile.avatarUrl || sitterProfile.avatarUrl || '',
            about: ownerProfile.about || sitterProfile.about || '',
            averageRating: sitterProfile.rating > 0 ? sitterProfile.rating : ownerProfile.averageRating,
            pets: ownerProfile.pets,
            badges,
            reviews,
            yearsExperience: sitterProfile.yearsExperience,
            identityVerified: sitterProfile.identityVerified,
            repeatClientRate: sitterProfile.repeatClientRate,
            verification,
            verificationLevel: verification.level,
            tags: sitterProfile.tags,
            services,
            galleryImageUrls: sitterProfile.galleryImageUrls ?? [],
        };
    }

    async updateMyAvatar(userId: string, avatarUrl: string | null) {
        await this.ensureUserProfiles(userId);

        const normalizedAvatar = avatarUrl?.trim() ?? '';

        await this.prisma.$transaction([
            this.prisma.ownerProfile.update({
                where: { userId },
                data: { avatarUrl: normalizedAvatar },
            }),
            this.prisma.sitter.update({
                where: { userId },
                data: { avatarUrl: normalizedAvatar },
            }),
        ]);

        return this.getMe(userId);
    }

    async updateMyProfile(userId: string, input: UpdateProfileInput) {
        await this.ensureUserProfiles(userId);

        const trimmed = (v?: string) => v?.trim() || undefined;
        const positiveInt = (v?: number) =>
            v !== undefined ? Math.max(0, Math.floor(Number(v))) : undefined;

        if (input.yearsExperience !== undefined && !Number.isFinite(Number(input.yearsExperience))) {
            throw new BadRequestException('yearsExperience must be a number');
        }

        if (input.pricePerDay !== undefined && !Number.isFinite(Number(input.pricePerDay))) {
            throw new BadRequestException('pricePerDay must be a number');
        }

        if (input.pricePerHour !== undefined && !Number.isFinite(Number(input.pricePerHour))) {
            throw new BadRequestException('pricePerHour must be a number');
        }

        const validTags = ['overnight', 'walking', 'boarding', 'daily-care'];
        const sanitizedTags = input.tags !== undefined
            ? input.tags.filter((t) => validTags.includes(t))
            : undefined;

        const isAllowedDataImage = (value: string) =>
            /^data:image\/(jpeg|jpg|png|webp|heic|heif);base64,/i.test(value);

        const sanitizedGallery = input.galleryImageUrls !== undefined
            ? input.galleryImageUrls
                .map((u) => u.trim())
                .filter((u) => u.startsWith('https://') || isAllowedDataImage(u))
                .slice(0, 20)
            : undefined;

        const normalizedAbout = input.about !== undefined ? input.about.trim() : undefined;

        await this.prisma.$transaction([
            this.prisma.ownerProfile.update({
                where: { userId },
                data: {
                    fullName: trimmed(input.fullName),
                    city: trimmed(input.city),
                    district: trimmed(input.district),
                    about: normalizedAbout,
                },
            }),
            this.prisma.sitter.update({
                where: { userId },
                data: {
                    fullName: trimmed(input.fullName),
                    city: trimmed(input.city),
                    district: trimmed(input.district),
                    about: normalizedAbout,
                    yearsExperience: positiveInt(input.yearsExperience),
                    tags: sanitizedTags,
                    pricePerDay: positiveInt(input.pricePerDay),
                    pricePerHour: positiveInt(input.pricePerHour),
                    galleryImageUrls: sanitizedGallery,
                    isFeatured: true,
                },
            }),
        ]);

        return this.getMe(userId);
    }

    async addPet(userId: string, input: { name?: string; breed?: string; photoUrl?: string }) {
        await this.ensureUserProfiles(userId);

        const profile = await this.prisma.ownerProfile.findUnique({
            where: { userId },
            select: { id: true },
        });

        if (!profile) {
            throw new NotFoundException('Profile not found');
        }

        const name = input.name?.trim() ?? '';
        const breed = input.breed?.trim() ?? '';

        if (!name) throw new BadRequestException('name is required');
        if (!breed) throw new BadRequestException('breed is required');

        const isAllowedDataImage = (value: string) =>
            /^data:image\/(jpeg|jpg|png|webp|heic|heif);base64,/i.test(value);

        const rawPhoto = input.photoUrl?.trim() ?? '';
        const safePhotoUrl =
            rawPhoto === '' || rawPhoto.startsWith('https://') || isAllowedDataImage(rawPhoto)
                ? rawPhoto
                : '';

        return this.prisma.pet.create({
            data: { name, breed, photoUrl: safePhotoUrl, profileId: profile.id },
        });
    }

    async removePet(userId: string, petId: string) {
        await this.ensureUserProfiles(userId);

        const profile = await this.prisma.ownerProfile.findUnique({
            where: { userId },
            select: { id: true },
        });

        if (!profile) {
            throw new NotFoundException('Profile not found');
        }

        const pet = await this.prisma.pet.findUnique({
            where: { id: petId },
            select: { id: true, profileId: true },
        });

        if (!pet || pet.profileId !== profile.id) {
            throw new NotFoundException('Pet not found');
        }

        await this.prisma.pet.delete({ where: { id: petId } });
    }

    private async ensureUserProfiles(userId: string) {
        await this.prisma.$transaction(async (tx) => {
            const user = await tx.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    email: true,
                    ownerProfile: {
                        select: {
                            id: true,
                            fullName: true,
                            city: true,
                            district: true,
                            avatarUrl: true,
                            about: true,
                            averageRating: true,
                        },
                    },
                    sitterProfile: {
                        select: {
                            id: true,
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
                throw new NotFoundException('User not found');
            }

            if (user.ownerProfile && user.sitterProfile) {
                return;
            }

            const inferredFullName =
                user.ownerProfile?.fullName ||
                user.sitterProfile?.fullName ||
                user.email.split('@')[0] ||
                'Kullanici';
            const inferredCity = user.ownerProfile?.city || user.sitterProfile?.city || '';
            const inferredDistrict =
                user.ownerProfile?.district || user.sitterProfile?.district || inferredCity;
            const inferredAvatar =
                user.ownerProfile?.avatarUrl || user.sitterProfile?.avatarUrl || '';
            const inferredAbout = user.ownerProfile?.about || user.sitterProfile?.about || '';

            if (!user.ownerProfile) {
                await tx.ownerProfile.create({
                    data: {
                        userId: user.id,
                        fullName: inferredFullName,
                        roleLabel: 'EvcilMobil Kullanicisi',
                        city: inferredCity,
                        district: inferredDistrict,
                        avatarUrl: inferredAvatar,
                        about: inferredAbout,
                        averageRating: user.sitterProfile?.rating ?? 0,
                    },
                });
            }

            if (!user.sitterProfile) {
                await tx.sitter.create({
                    data: {
                        userId: user.id,
                        fullName: inferredFullName,
                        city: inferredCity,
                        district: inferredDistrict,
                        about: inferredAbout,
                        yearsExperience: 0,
                        identityVerified: false,
                        repeatClientRate: 0,
                        galleryImageUrls: [],
                        rating: user.ownerProfile?.averageRating ?? 0,
                        reviewCount: 0,
                        pricePerDay: 350,
                        pricePerHour: 120,
                        avatarUrl: inferredAvatar,
                        isFeatured: false,
                        tags: [],
                    },
                });
            }
        });
    }

    private buildSitterBadges(sitter: {
        identityVerified: boolean;
        yearsExperience: number;
        repeatClientRate: number;
    }) {
        const badges: Array<{ id: string; title: string; icon: 'security' | 'schedule' | 'favorite' }> = [];

        if (sitter.identityVerified) {
            badges.push({
                id: 'identity-verified',
                title: 'Kimlik Dogrulandi',
                icon: 'security',
            });
        }

        if (sitter.yearsExperience > 0) {
            badges.push({
                id: 'experience',
                title: `${sitter.yearsExperience} Yil Deneyim`,
                icon: 'schedule',
            });
        }

        if (sitter.repeatClientRate >= 70) {
            badges.push({
                id: 'repeat-rate',
                title: `%${sitter.repeatClientRate} Tekrar Musteri`,
                icon: 'favorite',
            });
        }

        return badges;
    }

    private mergeTrustBadges(
        badges: Array<{ id: string; title: string; icon: string }>,
        verification: VerificationSummary,
    ) {
        const result = [...badges];
        const hasBadge = (id: string) => result.some((badge) => badge.id === id);

        if (verification.phoneVerified && !hasBadge('phone-verified')) {
            result.push({
                id: 'phone-verified',
                title: 'Telefon Dogrulandi',
                icon: 'security',
            });
        }

        if (verification.identityVerified && !hasBadge('identity-verified')) {
            result.push({
                id: 'identity-verified',
                title: 'Kimlik Dogrulandi',
                icon: 'security',
            });
        }

        if (verification.experienceVerified && !hasBadge('experience-verified')) {
            result.push({
                id: 'experience-verified',
                title: 'Deneyim Onayli',
                icon: 'schedule',
            });
        }

        if (verification.referenceVerified && !hasBadge('reference-verified')) {
            result.push({
                id: 'reference-verified',
                title: 'Referans Onayli',
                icon: 'favorite',
            });
        }

        return result;
    }

    private async buildOwnerVerificationSummary(
        userId: string,
        profile: {
            avatarUrl: string;
            fullName: string;
            pets: Array<{ id: string }>;
            reviews: Array<{ id: string }>;
        },
    ): Promise<VerificationSummary> {
        const phoneVerified = await this.resolvePhoneVerified(userId);

        const identityVerified = Boolean(profile.avatarUrl?.trim()) && Boolean(profile.fullName?.trim());
        const experienceVerified = profile.pets.length > 0;
        const referenceVerified = profile.reviews.length > 0;

        return this.composeVerificationSummary({
            phoneVerified,
            identityVerified,
            experienceVerified,
            referenceVerified,
        });
    }

    private async buildSitterVerificationSummary(
        userId: string,
        sitter: {
            avatarUrl: string;
            identityVerified: boolean;
            yearsExperience: number;
            repeatClientRate: number;
            reviews: Array<{ id: string }>;
        },
    ): Promise<VerificationSummary> {
        const phoneVerified = await this.resolvePhoneVerified(userId);

        const identityVerified = sitter.identityVerified || Boolean(sitter.avatarUrl?.trim());
        const experienceVerified = sitter.yearsExperience >= 2;
        const referenceVerified = sitter.repeatClientRate >= 40 || sitter.reviews.length >= 2;

        return this.composeVerificationSummary({
            phoneVerified,
            identityVerified,
            experienceVerified,
            referenceVerified,
        });
    }

    private mergeVerificationSummaries(
        ownerVerification: VerificationSummary,
        sitterVerification: VerificationSummary,
    ) {
        return this.composeVerificationSummary({
            phoneVerified: ownerVerification.phoneVerified || sitterVerification.phoneVerified,
            identityVerified: ownerVerification.identityVerified || sitterVerification.identityVerified,
            experienceVerified: ownerVerification.experienceVerified || sitterVerification.experienceVerified,
            referenceVerified: ownerVerification.referenceVerified || sitterVerification.referenceVerified,
        });
    }

    private async resolvePhoneVerified(userId: string) {
        const [publishedWithPhone, applicationWithPhone] = await Promise.all([
            this.prisma.communityListing.findFirst({
                where: {
                    publishedByUserId: userId,
                    contactPhone: {
                        not: null,
                    },
                },
                select: { id: true },
            }),
            this.prisma.communityApplication.findFirst({
                where: {
                    applicantId: userId,
                    contactPhone: {
                        not: null,
                    },
                },
                select: { id: true },
            }),
        ]);

        return Boolean(publishedWithPhone || applicationWithPhone);
    }

    private composeVerificationSummary(input: {
        phoneVerified: boolean;
        identityVerified: boolean;
        experienceVerified: boolean;
        referenceVerified: boolean;
    }): VerificationSummary {
        const checks = [
            input.phoneVerified,
            input.identityVerified,
            input.experienceVerified,
            input.referenceVerified,
        ];

        const completed = checks.filter(Boolean).length;
        const score = completed * 25;
        const level: VerificationLevel =
            completed >= 4
                ? 'HIGH'
                : completed >= 2
                    ? 'MEDIUM'
                    : 'LOW';

        return {
            ...input,
            score,
            level,
        };
    }
}
