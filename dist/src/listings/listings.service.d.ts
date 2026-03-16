import { ListingType, UserRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import type { AuthenticatedUser } from '../auth/auth.types';
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
export declare class ListingsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getMyListings(user: AuthenticatedUser): Promise<{
        publishedByUser: {
            id: string;
            role: UserRole;
            email: string;
        };
        latitude: number | null;
        longitude: number | null;
        locationAccuracy: number | null;
        locationLastSharedAt: Date | null;
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
    }[]>;
    getFeatured(forRole?: string, options?: {
        includeDemo?: boolean;
    }): Promise<{
        publishedByUser: {
            id: string;
            role: UserRole;
            email: string;
        };
        latitude: number | null;
        longitude: number | null;
        locationAccuracy: number | null;
        locationLastSharedAt: Date | null;
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
    }[]>;
    getNearby(forRole?: string, city?: string, district?: string, options?: {
        includeDemo?: boolean;
    }): Promise<{
        publishedByUser: {
            id: string;
            role: UserRole;
            email: string;
        };
        latitude: number | null;
        longitude: number | null;
        locationAccuracy: number | null;
        locationLastSharedAt: Date | null;
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
    }[]>;
    getById(id: string, forRole?: string, options?: {
        includeDemo?: boolean;
    }): Promise<{
        publishedByUser: {
            id: string;
            role: UserRole;
            email: string;
        };
        latitude: number | null;
        longitude: number | null;
        locationAccuracy: number | null;
        locationLastSharedAt: Date | null;
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
    }>;
    createMyListing(user: AuthenticatedUser, input: CreateListingInput): Promise<{
        id: string;
        city: string;
        district: string;
        isFeatured: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        publishedByUserId: string;
        listingType: import(".prisma/client").$Enums.ListingType;
        budgetPerDay: number | null;
        servicePricePerDay: number | null;
        serviceUnit: string | null;
        serviceIcon: string | null;
        isActive: boolean;
        ownerProfileId: string | null;
        sitterId: string | null;
    }>;
    deleteMyListing(user: AuthenticatedUser, id: string): Promise<void>;
    private mapListing;
    private resolveViewerListingType;
    private buildDemoUserFilter;
    private validateText;
    private parsePrice;
}
export {};
