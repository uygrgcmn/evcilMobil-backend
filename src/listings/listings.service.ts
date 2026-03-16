import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ListingType, UserRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import type { AuthenticatedUser } from '../auth/auth.types';

const DEMO_USER_EMAILS = [
    'owner@evcilmobil.com',
    'elif.sitter@evcilmobil.com',
    'can.sitter@evcilmobil.com',
    'zeynep.sitter@evcilmobil.com',
] as const;

const ALLOWED_SERVICE_UNITS = ['/day', '/walk', '/night', '/session', '/hour'] as const;
const ALLOWED_SERVICE_ICONS = ['pets', 'directions-walk', 'hotel', 'home', 'medical-services'] as const;

type CreateListingInput = {
    title?: string;
    description?: string;
    city?: string;
    district?: string;
    budgetPerDay?: number | string;
    servicePricePerDay?: number | string;
    serviceUnit?: string;
    serviceIcon?: string;
};

@Injectable()
export class ListingsService {
    constructor(private readonly prisma: PrismaService) { }

    async getMyListings(user: AuthenticatedUser) {
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

    async getFeatured(forRole?: string, options: { includeDemo?: boolean } = {}) {
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

    async getNearby(
        forRole?: string,
        city?: string,
        district?: string,
        options: { includeDemo?: boolean } = {},
    ) {
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

    async getById(id: string, forRole?: string, options: { includeDemo?: boolean } = {}) {
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
            throw new NotFoundException('Listing not found');
        }

        return this.mapListing(listing);
    }

    async createMyListing(user: AuthenticatedUser, input: CreateListingInput) {
        const title = this.validateText(input.title, 'title');
        const description = this.validateText(input.description, 'description');
        const city = this.validateText(input.city, 'city');
        const district = this.validateText(input.district, 'district');

        if (user.role === UserRole.OWNER) {
            const ownerProfile = await this.prisma.ownerProfile.findUnique({
                where: { userId: user.id },
                select: { id: true },
            });

            if (!ownerProfile) {
                throw new NotFoundException('Owner profile not found');
            }

            return this.prisma.listing.create({
                data: {
                    title,
                    description,
                    city,
                    district,
                    listingType: ListingType.OWNER_REQUEST,
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
            throw new NotFoundException('Sitter profile not found');
        }

        const rawUnit = input.serviceUnit?.trim() ?? '';
        const rawIcon = input.serviceIcon?.trim() ?? '';
        const serviceUnit = (ALLOWED_SERVICE_UNITS as readonly string[]).includes(rawUnit) ? rawUnit : '/day';
        const serviceIcon = (ALLOWED_SERVICE_ICONS as readonly string[]).includes(rawIcon) ? rawIcon : 'pets';

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
                listingType: ListingType.SITTER_SERVICE,
                budgetPerDay: null,
                servicePricePerDay: this.parsePrice(input.servicePricePerDay, 'servicePricePerDay'),
                serviceUnit,
                serviceIcon,
                sitterId: sitterProfile.id,
                publishedByUserId: user.id,
            },
        });
    }

    async deleteMyListing(user: AuthenticatedUser, id: string): Promise<void> {
        const owned = await this.prisma.listing.findFirst({
            where: { id, publishedByUserId: user.id },
            select: { id: true },
        });

        if (!owned) {
            throw new NotFoundException('Listing not found or not owned by user');
        }

        await this.prisma.listing.delete({ where: { id } });
    }

    private mapListing(listing: {
        id: string;
        title: string;
        description: string;
        listingType: ListingType;
        city: string;
        district: string;
        budgetPerDay: number | null;
        servicePricePerDay: number | null;
        serviceUnit: string | null;
        serviceIcon: string | null;
        isFeatured: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        publishedByUser: {
            id: string;
            role: UserRole;
            email: string;
            activeLocation: {
                latitude: number;
                longitude: number;
                accuracy: number | null;
                lastSharedAt: Date;
            } | null;
        };
    }) {
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

    private resolveViewerListingType(forRole?: string): ListingType {
        const normalized = forRole?.trim().toLowerCase();

        if (normalized === 'sitter') {
            return ListingType.OWNER_REQUEST;
        }

        return ListingType.SITTER_SERVICE;
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

    private validateText(value: string | undefined, field: string): string {
        if (!value || typeof value !== 'string' || !value.trim()) {
            throw new BadRequestException(`${field} is required`);
        }

        return value.trim();
    }

    private parsePrice(
        value: number | string | undefined,
        field: string,
    ): number | null {
        if (value === undefined || value === null || value === '') {
            return null;
        }

        const parsed = typeof value === 'number' ? value : Number(value);

        if (!Number.isFinite(parsed) || parsed < 0) {
            throw new BadRequestException(`${field} must be a positive number`);
        }

        return Math.round(parsed);
    }
}
