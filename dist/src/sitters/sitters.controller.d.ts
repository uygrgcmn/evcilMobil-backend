import { SittersService } from './sitters.service';
export declare class SittersController {
    private readonly sittersService;
    constructor(sittersService: SittersService);
    private parseIncludeDemo;
    list(featured?: string, search?: string, tag?: string, city?: string, district?: string, includeDemo?: string): Promise<{
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
    }[]>;
    findProfile(id: string, includeDemo?: string): Promise<{
        roleLabel: string;
        yearsExperience: number;
        identityVerified: boolean;
        repeatClientRate: number;
        about: string;
        services: {
            id: string;
            title: string;
            description: string;
            price: number;
            unit: string;
            icon: string;
        }[];
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
    findOne(id: string, includeDemo?: string): Promise<{
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
}
