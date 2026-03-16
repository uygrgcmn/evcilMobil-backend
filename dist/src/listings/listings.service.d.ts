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
            ownerProfile: {
                fullName: string;
                avatarUrl: string;
                _count: {
                    pets: number;
                    reviews: number;
                };
            } | null;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            sitterProfile: {
                fullName: string;
                reviewCount: number;
                avatarUrl: string;
                yearsExperience: number;
                identityVerified: boolean;
                repeatClientRate: number;
                galleryImageUrls: string[];
            } | null;
        };
        publisherVerificationLevel: "LOW" | "MEDIUM" | "HIGH";
        qualityScore: number;
        qualityTier: "LOW" | "MEDIUM" | "HIGH";
        qualityReasons: string[];
        latitude: number | null;
        longitude: number | null;
        locationAccuracy: number | null;
        locationLastSharedAt: Date | null;
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
    }[]>;
    getFeatured(forRole?: string, options?: {
        includeDemo?: boolean;
    }): Promise<{
        publishedByUser: {
            id: string;
            ownerProfile: {
                fullName: string;
                avatarUrl: string;
                _count: {
                    pets: number;
                    reviews: number;
                };
            } | null;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            sitterProfile: {
                fullName: string;
                reviewCount: number;
                avatarUrl: string;
                yearsExperience: number;
                identityVerified: boolean;
                repeatClientRate: number;
                galleryImageUrls: string[];
            } | null;
        };
        publisherVerificationLevel: "LOW" | "MEDIUM" | "HIGH";
        qualityScore: number;
        qualityTier: "LOW" | "MEDIUM" | "HIGH";
        qualityReasons: string[];
        latitude: number | null;
        longitude: number | null;
        locationAccuracy: number | null;
        locationLastSharedAt: Date | null;
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
    }[]>;
    getNearby(forRole?: string, city?: string, district?: string, options?: {
        includeDemo?: boolean;
    }): Promise<{
        publishedByUser: {
            id: string;
            ownerProfile: {
                fullName: string;
                avatarUrl: string;
                _count: {
                    pets: number;
                    reviews: number;
                };
            } | null;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            sitterProfile: {
                fullName: string;
                reviewCount: number;
                avatarUrl: string;
                yearsExperience: number;
                identityVerified: boolean;
                repeatClientRate: number;
                galleryImageUrls: string[];
            } | null;
        };
        publisherVerificationLevel: "LOW" | "MEDIUM" | "HIGH";
        qualityScore: number;
        qualityTier: "LOW" | "MEDIUM" | "HIGH";
        qualityReasons: string[];
        latitude: number | null;
        longitude: number | null;
        locationAccuracy: number | null;
        locationLastSharedAt: Date | null;
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
    }[]>;
    getById(id: string, forRole?: string, options?: {
        includeDemo?: boolean;
    }): Promise<{
        publishedByUser: {
            id: string;
            ownerProfile: {
                fullName: string;
                avatarUrl: string;
                _count: {
                    pets: number;
                    reviews: number;
                };
            } | null;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            sitterProfile: {
                fullName: string;
                reviewCount: number;
                avatarUrl: string;
                yearsExperience: number;
                identityVerified: boolean;
                repeatClientRate: number;
                galleryImageUrls: string[];
            } | null;
        };
        publisherVerificationLevel: "LOW" | "MEDIUM" | "HIGH";
        qualityScore: number;
        qualityTier: "LOW" | "MEDIUM" | "HIGH";
        qualityReasons: string[];
        latitude: number | null;
        longitude: number | null;
        locationAccuracy: number | null;
        locationLastSharedAt: Date | null;
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
    createMyListing(user: AuthenticatedUser, input: CreateListingInput): Promise<{
        publishedByUser: {
            id: string;
            ownerProfile: {
                fullName: string;
                avatarUrl: string;
                _count: {
                    pets: number;
                    reviews: number;
                };
            } | null;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            sitterProfile: {
                fullName: string;
                reviewCount: number;
                avatarUrl: string;
                yearsExperience: number;
                identityVerified: boolean;
                repeatClientRate: number;
                galleryImageUrls: string[];
            } | null;
        };
        publisherVerificationLevel: "LOW" | "MEDIUM" | "HIGH";
        qualityScore: number;
        qualityTier: "LOW" | "MEDIUM" | "HIGH";
        qualityReasons: string[];
        latitude: number | null;
        longitude: number | null;
        locationAccuracy: number | null;
        locationLastSharedAt: Date | null;
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
    private resolveViewerListingFilter;
    private ensureOwnerProfile;
    private ensureSitterProfile;
    private buildDemoUserFilter;
    private validateText;
    private parsePrice;
    private assertListingTextQuality;
    private assertOwnerMediaEligibility;
    private assertSitterMediaEligibility;
    private resolvePublisherVerification;
    private computeListingQuality;
    private toQualityTier;
}
export {};
