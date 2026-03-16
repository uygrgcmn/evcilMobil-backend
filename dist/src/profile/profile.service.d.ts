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
export declare class ProfileService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly ownerProfileIncludes;
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
        verification: VerificationSummary;
        verificationLevel: VerificationLevel;
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
    updateMyAvatar(userId: string, avatarUrl: string | null): Promise<{
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
        verification: VerificationSummary;
        verificationLevel: VerificationLevel;
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
    updateMyProfile(userId: string, input: UpdateProfileInput): Promise<{
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
        verification: VerificationSummary;
        verificationLevel: VerificationLevel;
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
    addPet(userId: string, input: {
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
    removePet(userId: string, petId: string): Promise<void>;
    private ensureUserProfiles;
    private buildSitterBadges;
    private mergeTrustBadges;
    private buildOwnerVerificationSummary;
    private buildSitterVerificationSummary;
    private mergeVerificationSummaries;
    private resolvePhoneVerified;
    private composeVerificationSummary;
}
export {};
