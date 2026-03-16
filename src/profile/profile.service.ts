import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRole } from '@prisma/client';
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

@Injectable()
export class ProfileService {
    constructor(private readonly prisma: PrismaService) { }

    private readonly ownerProfileIncludes = {
        pets: true,
        badges: true,
        reviews: true,
    } as const;

    async getMe(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { role: true },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.role === UserRole.OWNER) {
            const profile = await this.prisma.ownerProfile.findUnique({
                where: { userId },
                include: this.ownerProfileIncludes,
            });

            if (!profile) {
                throw new NotFoundException('Profile not found');
            }

            return {
                ...profile,
                userRole: UserRole.OWNER,
                services: [],
            };
        }

        const sitter = await this.prisma.sitter.findUnique({
            where: { userId },
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
        });

        if (!sitter) {
            throw new NotFoundException('Profile not found');
        }

        return this.mapSitterToProfile(sitter);
    }

    async updateMyAvatar(userId: string, avatarUrl: string | null) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { role: true },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const normalizedAvatar = avatarUrl?.trim() ?? '';

        if (user.role === UserRole.OWNER) {
            const profile = await this.prisma.ownerProfile.findUnique({
                where: { userId },
                select: { id: true },
            });

            if (!profile) {
                throw new NotFoundException('Profile not found');
            }

            const updatedProfile = await this.prisma.ownerProfile.update({
                where: { id: profile.id },
                data: { avatarUrl: normalizedAvatar },
                include: this.ownerProfileIncludes,
            });

            return {
                ...updatedProfile,
                userRole: UserRole.OWNER,
                services: [],
            };
        }

        const sitter = await this.prisma.sitter.findUnique({
            where: { userId },
            select: { id: true },
        });

        if (!sitter) {
            throw new NotFoundException('Profile not found');
        }

        const updatedSitter = await this.prisma.sitter.update({
            where: { id: sitter.id },
            data: { avatarUrl: normalizedAvatar },
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
        });

        return this.mapSitterToProfile(updatedSitter);
    }

    async updateMyProfile(userId: string, input: UpdateProfileInput) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { role: true },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const trimmed = (v?: string) => v?.trim() || undefined;
        const positiveInt = (v?: number) =>
            v !== undefined ? Math.max(0, Math.floor(Number(v))) : undefined;

        if (!Number.isFinite(positiveInt(input.yearsExperience) ?? 0)) {
            throw new BadRequestException('yearsExperience must be a number');
        }

        if (user.role === UserRole.OWNER) {
            const profile = await this.prisma.ownerProfile.findUnique({
                where: { userId },
                select: { id: true },
            });

            if (!profile) {
                throw new NotFoundException('Profile not found');
            }

            const updated = await this.prisma.ownerProfile.update({
                where: { id: profile.id },
                data: {
                    fullName: trimmed(input.fullName),
                    city: trimmed(input.city),
                    district: trimmed(input.district),
                    about: input.about !== undefined ? (input.about.trim() ?? '') : undefined,
                },
                include: this.ownerProfileIncludes,
            });

            return { ...updated, userRole: UserRole.OWNER, services: [] };
        }

        const sitter = await this.prisma.sitter.findUnique({
            where: { userId },
            select: { id: true },
        });

        if (!sitter) {
            throw new NotFoundException('Profile not found');
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

        const updated = await this.prisma.sitter.update({
            where: { id: sitter.id },
            data: {
                fullName: trimmed(input.fullName),
                city: trimmed(input.city),
                district: trimmed(input.district),
                about: input.about !== undefined ? input.about.trim() : undefined,
                yearsExperience: positiveInt(input.yearsExperience),
                tags: sanitizedTags,
                pricePerDay: positiveInt(input.pricePerDay),
                pricePerHour: positiveInt(input.pricePerHour),
                galleryImageUrls: sanitizedGallery,
                isFeatured: true,
            },
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
        });

        return this.mapSitterToProfile(updated);
    }

    async addPet(userId: string, input: { name?: string; breed?: string; photoUrl?: string }) {
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

    private mapSitterToProfile(sitter: {
        id: string;
        fullName: string;
        district: string;
        city: string;
        avatarUrl: string;
        about: string;
        rating: number;
        yearsExperience: number;
        identityVerified: boolean;
        repeatClientRate: number;
        tags: string[];
        galleryImageUrls?: string[];
        listings: Array<{
            id: string;
            title: string;
            description: string;
            servicePricePerDay: number | null;
            serviceUnit: string | null;
            serviceIcon: string | null;
        }>;
        reviews: Array<{
            id: string;
            authorName: string;
            authorAvatarUrl: string;
            rating: number;
            comment: string;
            timeLabel: string;
        }>;
    }) {
        return {
            id: sitter.id,
            userRole: UserRole.SITTER,
            fullName: sitter.fullName,
            roleLabel: 'Bakici',
            district: sitter.district,
            city: sitter.city,
            avatarUrl: sitter.avatarUrl,
            about: sitter.about,
            averageRating: sitter.rating,
            pets: [],
            badges: this.buildSitterBadges(sitter),
            galleryImageUrls: sitter.galleryImageUrls ?? [],
            reviews: sitter.reviews.map((review) => ({
                id: review.id,
                authorName: review.authorName,
                authorAvatarUrl: review.authorAvatarUrl,
                rating: review.rating,
                comment: review.comment,
                timeLabel: review.timeLabel,
            })),
            yearsExperience: sitter.yearsExperience,
            identityVerified: sitter.identityVerified,
            repeatClientRate: sitter.repeatClientRate,
            tags: sitter.tags,
            services: sitter.listings
                .filter((listing) => listing.servicePricePerDay !== null)
                .map((listing) => ({
                    id: listing.id,
                    title: listing.title,
                    description: listing.description,
                    price: listing.servicePricePerDay ?? 0,
                    unit: listing.serviceUnit || '/day',
                    icon: listing.serviceIcon || 'pets',
                })),
        };
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
}
