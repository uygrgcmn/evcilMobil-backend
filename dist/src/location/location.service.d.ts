import type { AuthenticatedUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
type UpdateLocationInput = {
    latitude?: number | string;
    longitude?: number | string;
    accuracy?: number | string | null;
};
export declare class LocationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    updateCurrentUserLocation(user: AuthenticatedUser, input: UpdateLocationInput): Promise<{
        id: string;
        updatedAt: Date;
        userId: string;
        latitude: number;
        longitude: number;
        accuracy: number | null;
        lastSharedAt: Date;
    }>;
    getCurrentUserLocation(user: AuthenticatedUser): Promise<{
        id: string;
        updatedAt: Date;
        userId: string;
        latitude: number;
        longitude: number;
        accuracy: number | null;
        lastSharedAt: Date;
    } | null>;
    private parseLatitude;
    private parseLongitude;
    private parseAccuracy;
    private toNumber;
}
export {};
