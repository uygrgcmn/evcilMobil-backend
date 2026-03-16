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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let ProfileService = class ProfileService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    ownerProfileIncludes = {
        pets: true,
        badges: true,
        reviews: true,
    };
    async getMe(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { role: true },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.role === client_1.UserRole.OWNER) {
            const profile = await this.prisma.ownerProfile.findUnique({
                where: { userId },
                include: this.ownerProfileIncludes,
            });
            if (!profile) {
                throw new common_1.NotFoundException('Profile not found');
            }
            return {
                ...profile,
                userRole: client_1.UserRole.OWNER,
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
            throw new common_1.NotFoundException('Profile not found');
        }
        return this.mapSitterToProfile(sitter);
    }
    async updateMyAvatar(userId, avatarUrl) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { role: true },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const normalizedAvatar = avatarUrl?.trim() ?? '';
        if (user.role === client_1.UserRole.OWNER) {
            const profile = await this.prisma.ownerProfile.findUnique({
                where: { userId },
                select: { id: true },
            });
            if (!profile) {
                throw new common_1.NotFoundException('Profile not found');
            }
            const updatedProfile = await this.prisma.ownerProfile.update({
                where: { id: profile.id },
                data: { avatarUrl: normalizedAvatar },
                include: this.ownerProfileIncludes,
            });
            return {
                ...updatedProfile,
                userRole: client_1.UserRole.OWNER,
                services: [],
            };
        }
        const sitter = await this.prisma.sitter.findUnique({
            where: { userId },
            select: { id: true },
        });
        if (!sitter) {
            throw new common_1.NotFoundException('Profile not found');
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
    async updateMyProfile(userId, input) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { role: true },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const trimmed = (v) => v?.trim() || undefined;
        const positiveInt = (v) => v !== undefined ? Math.max(0, Math.floor(Number(v))) : undefined;
        if (!Number.isFinite(positiveInt(input.yearsExperience) ?? 0)) {
            throw new common_1.BadRequestException('yearsExperience must be a number');
        }
        if (user.role === client_1.UserRole.OWNER) {
            const profile = await this.prisma.ownerProfile.findUnique({
                where: { userId },
                select: { id: true },
            });
            if (!profile) {
                throw new common_1.NotFoundException('Profile not found');
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
            return { ...updated, userRole: client_1.UserRole.OWNER, services: [] };
        }
        const sitter = await this.prisma.sitter.findUnique({
            where: { userId },
            select: { id: true },
        });
        if (!sitter) {
            throw new common_1.NotFoundException('Profile not found');
        }
        const validTags = ['overnight', 'walking', 'boarding', 'daily-care'];
        const sanitizedTags = input.tags !== undefined
            ? input.tags.filter((t) => validTags.includes(t))
            : undefined;
        const isAllowedDataImage = (value) => /^data:image\/(jpeg|jpg|png|webp|heic|heif);base64,/i.test(value);
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
    async addPet(userId, input) {
        const profile = await this.prisma.ownerProfile.findUnique({
            where: { userId },
            select: { id: true },
        });
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        const name = input.name?.trim() ?? '';
        const breed = input.breed?.trim() ?? '';
        if (!name)
            throw new common_1.BadRequestException('name is required');
        if (!breed)
            throw new common_1.BadRequestException('breed is required');
        const isAllowedDataImage = (value) => /^data:image\/(jpeg|jpg|png|webp|heic|heif);base64,/i.test(value);
        const rawPhoto = input.photoUrl?.trim() ?? '';
        const safePhotoUrl = rawPhoto === '' || rawPhoto.startsWith('https://') || isAllowedDataImage(rawPhoto)
            ? rawPhoto
            : '';
        return this.prisma.pet.create({
            data: { name, breed, photoUrl: safePhotoUrl, profileId: profile.id },
        });
    }
    async removePet(userId, petId) {
        const profile = await this.prisma.ownerProfile.findUnique({
            where: { userId },
            select: { id: true },
        });
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        const pet = await this.prisma.pet.findUnique({
            where: { id: petId },
            select: { id: true, profileId: true },
        });
        if (!pet || pet.profileId !== profile.id) {
            throw new common_1.NotFoundException('Pet not found');
        }
        await this.prisma.pet.delete({ where: { id: petId } });
    }
    mapSitterToProfile(sitter) {
        return {
            id: sitter.id,
            userRole: client_1.UserRole.SITTER,
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
    buildSitterBadges(sitter) {
        const badges = [];
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
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map