import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const DEMO_USER_EMAILS = [
    'owner@evcilmobil.com',
    'elif.sitter@evcilmobil.com',
    'can.sitter@evcilmobil.com',
    'zeynep.sitter@evcilmobil.com',
] as const;

type SitterListFilters = {
    featured?: boolean;
    search?: string;
    tag?: string;
    city?: string;
    district?: string;
};

type SitterServiceItem = {
    id: string;
    title: string;
    description: string;
    price: number;
    unit: string;
    icon: string;
};

type VerificationLevel = 'LOW' | 'MEDIUM' | 'HIGH';

@Injectable()
export class SittersService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllSitters(
        filters: Omit<SitterListFilters, 'featured'> = {},
        options: { includeDemo?: boolean } = {},
    ) {
        return this.listSitters({ ...filters, featured: false }, options);
    }

    async getFeaturedSitters(
        filters: Omit<SitterListFilters, 'featured'> = {},
        options: { includeDemo?: boolean } = {},
    ) {
        return this.listSitters({ ...filters, featured: true }, options);
    }

    async getSitterById(id: string, options: { includeDemo?: boolean } = {}) {
        const sitter = await this.prisma.sitter.findFirst({
            where: {
                id,
                user: this.buildDemoUserFilter(options.includeDemo),
            },
            include: {
                user: {
                    select: {
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

        if (!sitter) {
            throw new NotFoundException(`Sitter with ID ${id} not found`);
        }

        return this.mapSitterSummary(sitter);
    }

    async getSitterProfileById(id: string, options: { includeDemo?: boolean } = {}) {
        const sitter = await this.prisma.sitter.findFirst({
            where: {
                id,
                user: this.buildDemoUserFilter(options.includeDemo),
            },
            include: {
                user: {
                    select: {
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
                    },
                    orderBy: [{ isFeatured: 'desc' }, { updatedAt: 'desc' }],
                    take: 8,
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
            throw new NotFoundException(`Sitter with ID ${id} not found`);
        }

        const summary = this.mapSitterSummary(sitter);
        const services = sitter.listings
            .filter((listing) => listing.servicePricePerDay !== null)
            .map<SitterServiceItem>((listing) => ({
                id: listing.id,
                title: listing.title,
                description: listing.description,
                price: listing.servicePricePerDay ?? sitter.pricePerDay,
                unit: listing.serviceUnit || '/day',
                icon: listing.serviceIcon || 'pets',
            }));

        return {
            ...summary,
            roleLabel: 'Professional Sitter',
            yearsExperience: sitter.yearsExperience,
            identityVerified: sitter.identityVerified,
            repeatClientRate: sitter.repeatClientRate,
            verificationLevel: this.resolveVerificationLevel(sitter),
            about: sitter.about,
            services,
            gallery: sitter.galleryImageUrls.map((imageUrl, index) => ({
                id: `${sitter.id}-gallery-${index + 1}`,
                imageUrl,
            })),
            reviews: sitter.reviews.map((review) => ({
                id: review.id,
                authorName: review.authorName,
                authorAvatarUrl: review.authorAvatarUrl,
                rating: review.rating,
                comment: review.comment,
                timeLabel: review.timeLabel,
            })),
        };
    }

    private async listSitters(
        filters: SitterListFilters,
        options: { includeDemo?: boolean } = {},
    ) {
        const normalizedSearch = filters.search?.trim();
        const normalizedTag = filters.tag?.trim();
        const normalizedCity = filters.city?.trim();
        const normalizedDistrict = filters.district?.trim();

        const sitters = await this.prisma.sitter.findMany({
            where: {
                isFeatured: filters.featured ? true : undefined,
                user: this.buildDemoUserFilter(options.includeDemo),
                tags: normalizedTag ? { has: normalizedTag } : undefined,
                city: normalizedCity
                    ? {
                        equals: normalizedCity,
                        mode: 'insensitive',
                    }
                    : undefined,
                district: normalizedDistrict
                    ? {
                        equals: normalizedDistrict,
                        mode: 'insensitive',
                    }
                    : undefined,
                OR: normalizedSearch
                    ? [
                        { fullName: { contains: normalizedSearch, mode: 'insensitive' } },
                        { city: { contains: normalizedSearch, mode: 'insensitive' } },
                        { district: { contains: normalizedSearch, mode: 'insensitive' } },
                        { tags: { has: normalizedSearch.toLowerCase() } },
                    ]
                    : undefined,
            },
            orderBy: [{ isFeatured: 'desc' }, { rating: 'desc' }, { reviewCount: 'desc' }],
            include: {
                user: {
                    select: {
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

        return sitters.map((sitter) => this.mapSitterSummary(sitter));
    }

    private buildDemoUserFilter(includeDemo = false) {
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

    private mapSitterSummary(sitter: {
        id: string;
        fullName: string;
        city: string;
        district: string;
        yearsExperience: number;
        identityVerified: boolean;
        repeatClientRate: number;
        rating: number;
        reviewCount: number;
        pricePerDay: number;
        pricePerHour: number;
        avatarUrl: string;
        isFeatured: boolean;
        tags: string[];
        user: {
            activeLocation: {
                latitude: number;
                longitude: number;
                accuracy: number | null;
                lastSharedAt: Date;
            } | null;
        } | null;
    }) {
        return {
            id: sitter.id,
            fullName: sitter.fullName,
            city: sitter.city,
            district: sitter.district,
            rating: sitter.rating,
            reviewCount: sitter.reviewCount,
            pricePerDay: sitter.pricePerDay,
            pricePerHour: sitter.pricePerHour,
            avatarUrl: sitter.avatarUrl,
            isFeatured: sitter.isFeatured,
            tags: sitter.tags,
            verificationLevel: this.resolveVerificationLevel(sitter),
            latitude: sitter.user?.activeLocation?.latitude ?? null,
            longitude: sitter.user?.activeLocation?.longitude ?? null,
            locationAccuracy: sitter.user?.activeLocation?.accuracy ?? null,
            locationLastSharedAt: sitter.user?.activeLocation?.lastSharedAt ?? null,
        };
    }

    private resolveVerificationLevel(input: {
        identityVerified: boolean;
        yearsExperience: number;
        reviewCount?: number;
        repeatClientRate: number;
        avatarUrl?: string;
    }): VerificationLevel {
        const checks = [
            input.identityVerified || Boolean(input.avatarUrl?.trim()),
            input.yearsExperience >= 2,
            (input.reviewCount ?? 0) >= 5 || input.repeatClientRate >= 40,
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
}