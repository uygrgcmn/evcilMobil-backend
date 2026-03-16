import { ProfileService } from './profile.service';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getMe(userId: string): Promise<{
        id: string;
        userId: string;
        ownerProfileId: string;
        sitterProfileId: string;
        userRole: import(".prisma/client").$Enums.UserRole;
        roleLabel: string;
        fullName: string;
        district: string;
        city: string;
        avatarUrl: string;
        about: string;
        averageRating: number;
        pets: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            breed: string;
            photoUrl: string;
            profileId: string;
        }[];
        badges: {
            id: string;
            title: string;
            icon: string;
        }[];
        reviews: ({
            id: string;
            authorName: string;
            authorAvatarUrl: string;
            rating: number;
            comment: string;
            timeLabel: undefined;
        } | {
            id: string;
            authorName: string;
            authorAvatarUrl: string;
            rating: number;
            comment: string;
            timeLabel: string;
        })[];
        yearsExperience: number;
        identityVerified: boolean;
        repeatClientRate: number;
        verification: {
            phoneVerified: boolean;
            identityVerified: boolean;
            experienceVerified: boolean;
            referenceVerified: boolean;
            score: number;
            level: "LOW" | "MEDIUM" | "HIGH";
        };
        verificationLevel: "LOW" | "MEDIUM" | "HIGH";
        tags: string[];
        services: {
            id: string;
            title: string;
            description: string;
            price: number;
            unit: string;
            icon: string;
        }[];
        galleryImageUrls: string[];
    }>;
    updateMe(userId: string, body?: {
        fullName?: string;
        city?: string;
        district?: string;
        about?: string;
        yearsExperience?: number;
        tags?: string[];
        pricePerDay?: number;
        pricePerHour?: number;
    }): Promise<{
        id: string;
        userId: string;
        ownerProfileId: string;
        sitterProfileId: string;
        userRole: import(".prisma/client").$Enums.UserRole;
        roleLabel: string;
        fullName: string;
        district: string;
        city: string;
        avatarUrl: string;
        about: string;
        averageRating: number;
        pets: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            breed: string;
            photoUrl: string;
            profileId: string;
        }[];
        badges: {
            id: string;
            title: string;
            icon: string;
        }[];
        reviews: ({
            id: string;
            authorName: string;
            authorAvatarUrl: string;
            rating: number;
            comment: string;
            timeLabel: undefined;
        } | {
            id: string;
            authorName: string;
            authorAvatarUrl: string;
            rating: number;
            comment: string;
            timeLabel: string;
        })[];
        yearsExperience: number;
        identityVerified: boolean;
        repeatClientRate: number;
        verification: {
            phoneVerified: boolean;
            identityVerified: boolean;
            experienceVerified: boolean;
            referenceVerified: boolean;
            score: number;
            level: "LOW" | "MEDIUM" | "HIGH";
        };
        verificationLevel: "LOW" | "MEDIUM" | "HIGH";
        tags: string[];
        services: {
            id: string;
            title: string;
            description: string;
            price: number;
            unit: string;
            icon: string;
        }[];
        galleryImageUrls: string[];
    }>;
    updateMyAvatar(userId: string, body?: {
        avatarUrl?: string | null;
    }): Promise<{
        id: string;
        userId: string;
        ownerProfileId: string;
        sitterProfileId: string;
        userRole: import(".prisma/client").$Enums.UserRole;
        roleLabel: string;
        fullName: string;
        district: string;
        city: string;
        avatarUrl: string;
        about: string;
        averageRating: number;
        pets: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            breed: string;
            photoUrl: string;
            profileId: string;
        }[];
        badges: {
            id: string;
            title: string;
            icon: string;
        }[];
        reviews: ({
            id: string;
            authorName: string;
            authorAvatarUrl: string;
            rating: number;
            comment: string;
            timeLabel: undefined;
        } | {
            id: string;
            authorName: string;
            authorAvatarUrl: string;
            rating: number;
            comment: string;
            timeLabel: string;
        })[];
        yearsExperience: number;
        identityVerified: boolean;
        repeatClientRate: number;
        verification: {
            phoneVerified: boolean;
            identityVerified: boolean;
            experienceVerified: boolean;
            referenceVerified: boolean;
            score: number;
            level: "LOW" | "MEDIUM" | "HIGH";
        };
        verificationLevel: "LOW" | "MEDIUM" | "HIGH";
        tags: string[];
        services: {
            id: string;
            title: string;
            description: string;
            price: number;
            unit: string;
            icon: string;
        }[];
        galleryImageUrls: string[];
    }>;
    addPet(userId: string, body?: {
        name?: string;
        breed?: string;
        photoUrl?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        breed: string;
        photoUrl: string;
        profileId: string;
    }>;
    removePet(userId: string, petId: string): Promise<{
        ok: boolean;
    }>;
}
