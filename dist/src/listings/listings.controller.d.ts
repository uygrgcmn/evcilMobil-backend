import type { AuthenticatedUser } from '../auth/auth.types';
import { ListingsService } from './listings.service';
export declare class ListingsController {
    private readonly listingsService;
    constructor(listingsService: ListingsService);
    private parseIncludeDemo;
    mine(user: AuthenticatedUser): Promise<{
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
    featured(forRole?: string, includeDemo?: string): Promise<{
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
    nearby(forRole?: string, city?: string, district?: string, includeDemo?: string): Promise<{
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
    findOne(id: string, forRole?: string, includeDemo?: string): Promise<{
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
    create(user: AuthenticatedUser, body: {
        title?: string;
        description?: string;
        city?: string;
        district?: string;
        budgetPerDay?: number | string;
        servicePricePerDay?: number | string;
        serviceUnit?: string;
        serviceIcon?: string;
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
    remove(user: AuthenticatedUser, id: string): Promise<void>;
}
