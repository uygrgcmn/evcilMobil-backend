import { PrismaService } from '../prisma/prisma.service';
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
export declare class SittersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllSitters(filters?: Omit<SitterListFilters, 'featured'>, options?: {
        includeDemo?: boolean;
    }): Promise<{
        id: string;
        fullName: string;
        city: string;
        district: string;
        rating: number;
        reviewCount: number;
        pricePerDay: number;
        pricePerHour: number;
        avatarUrl: string;
        isFeatured: boolean;
        tags: string[];
        verificationLevel: VerificationLevel;
        latitude: number | null;
        longitude: number | null;
        locationAccuracy: number | null;
        locationLastSharedAt: Date | null;
    }[]>;
    getFeaturedSitters(filters?: Omit<SitterListFilters, 'featured'>, options?: {
        includeDemo?: boolean;
    }): Promise<{
        id: string;
        fullName: string;
        city: string;
        district: string;
        rating: number;
        reviewCount: number;
        pricePerDay: number;
        pricePerHour: number;
        avatarUrl: string;
        isFeatured: boolean;
        tags: string[];
        verificationLevel: VerificationLevel;
        latitude: number | null;
        longitude: number | null;
        locationAccuracy: number | null;
        locationLastSharedAt: Date | null;
    }[]>;
    getSitterById(id: string, options?: {
        includeDemo?: boolean;
    }): Promise<{
        id: string;
        fullName: string;
        city: string;
        district: string;
        rating: number;
        reviewCount: number;
        pricePerDay: number;
        pricePerHour: number;
        avatarUrl: string;
        isFeatured: boolean;
        tags: string[];
        verificationLevel: VerificationLevel;
        latitude: number | null;
        longitude: number | null;
        locationAccuracy: number | null;
        locationLastSharedAt: Date | null;
    }>;
    getSitterProfileById(id: string, options?: {
        includeDemo?: boolean;
    }): Promise<{
        roleLabel: string;
        yearsExperience: number;
        identityVerified: boolean;
        repeatClientRate: number;
        verificationLevel: VerificationLevel;
        about: string;
        services: SitterServiceItem[];
        gallery: {
            id: string;
            imageUrl: string;
        }[];
        reviews: {
            id: string;
            authorName: string;
            authorAvatarUrl: string;
            rating: number;
            comment: string;
            timeLabel: string;
        }[];
        id: string;
        fullName: string;
        city: string;
        district: string;
        rating: number;
        reviewCount: number;
        pricePerDay: number;
        pricePerHour: number;
        avatarUrl: string;
        isFeatured: boolean;
        tags: string[];
        latitude: number | null;
        longitude: number | null;
        locationAccuracy: number | null;
        locationLastSharedAt: Date | null;
    }>;
    private listSitters;
    private buildDemoUserFilter;
    private mapSitterSummary;
    private resolveVerificationLevel;
}
export {};
