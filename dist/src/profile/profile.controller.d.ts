import { ProfileService } from './profile.service';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getMe(userId: string): Promise<{
        id: string;
        userRole: "SITTER";
        fullName: string;
        roleLabel: string;
        district: string;
        city: string;
        avatarUrl: string;
        about: string;
        averageRating: number;
        pets: never[];
        badges: {
            id: string;
            title: string;
            icon: "security" | "schedule" | "favorite";
        }[];
        galleryImageUrls: string[];
        reviews: {
            id: string;
            authorName: string;
            authorAvatarUrl: string;
            rating: number;
            comment: string;
            timeLabel: string;
        }[];
        yearsExperience: number;
        identityVerified: boolean;
        repeatClientRate: number;
        tags: string[];
        services: {
            id: string;
            title: string;
            description: string;
            price: number;
            unit: string;
            icon: string;
        }[];
    } | {
        userRole: "OWNER";
        services: never[];
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
            createdAt: Date;
            updatedAt: Date;
            profileId: string;
            title: string;
            icon: string;
        }[];
        reviews: {
            id: string;
            rating: number;
            createdAt: Date;
            updatedAt: Date;
            profileId: string;
            authorName: string;
            authorAvatarUrl: string;
            comment: string;
        }[];
        id: string;
        fullName: string;
        city: string;
        district: string;
        avatarUrl: string;
        createdAt: Date;
        updatedAt: Date;
        roleLabel: string;
        about: string;
        averageRating: number;
        userId: string | null;
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
        userRole: "SITTER";
        fullName: string;
        roleLabel: string;
        district: string;
        city: string;
        avatarUrl: string;
        about: string;
        averageRating: number;
        pets: never[];
        badges: {
            id: string;
            title: string;
            icon: "security" | "schedule" | "favorite";
        }[];
        galleryImageUrls: string[];
        reviews: {
            id: string;
            authorName: string;
            authorAvatarUrl: string;
            rating: number;
            comment: string;
            timeLabel: string;
        }[];
        yearsExperience: number;
        identityVerified: boolean;
        repeatClientRate: number;
        tags: string[];
        services: {
            id: string;
            title: string;
            description: string;
            price: number;
            unit: string;
            icon: string;
        }[];
    } | {
        userRole: "OWNER";
        services: never[];
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
            createdAt: Date;
            updatedAt: Date;
            profileId: string;
            title: string;
            icon: string;
        }[];
        reviews: {
            id: string;
            rating: number;
            createdAt: Date;
            updatedAt: Date;
            profileId: string;
            authorName: string;
            authorAvatarUrl: string;
            comment: string;
        }[];
        id: string;
        fullName: string;
        city: string;
        district: string;
        avatarUrl: string;
        createdAt: Date;
        updatedAt: Date;
        roleLabel: string;
        about: string;
        averageRating: number;
        userId: string | null;
    }>;
    updateMyAvatar(userId: string, body?: {
        avatarUrl?: string | null;
    }): Promise<{
        id: string;
        userRole: "SITTER";
        fullName: string;
        roleLabel: string;
        district: string;
        city: string;
        avatarUrl: string;
        about: string;
        averageRating: number;
        pets: never[];
        badges: {
            id: string;
            title: string;
            icon: "security" | "schedule" | "favorite";
        }[];
        galleryImageUrls: string[];
        reviews: {
            id: string;
            authorName: string;
            authorAvatarUrl: string;
            rating: number;
            comment: string;
            timeLabel: string;
        }[];
        yearsExperience: number;
        identityVerified: boolean;
        repeatClientRate: number;
        tags: string[];
        services: {
            id: string;
            title: string;
            description: string;
            price: number;
            unit: string;
            icon: string;
        }[];
    } | {
        userRole: "OWNER";
        services: never[];
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
            createdAt: Date;
            updatedAt: Date;
            profileId: string;
            title: string;
            icon: string;
        }[];
        reviews: {
            id: string;
            rating: number;
            createdAt: Date;
            updatedAt: Date;
            profileId: string;
            authorName: string;
            authorAvatarUrl: string;
            comment: string;
        }[];
        id: string;
        fullName: string;
        city: string;
        district: string;
        avatarUrl: string;
        createdAt: Date;
        updatedAt: Date;
        roleLabel: string;
        about: string;
        averageRating: number;
        userId: string | null;
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
