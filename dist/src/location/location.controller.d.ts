import type { AuthenticatedUser } from '../auth/auth.types';
import { LocationService } from './location.service';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    update(user: AuthenticatedUser, body: {
        latitude?: number | string;
        longitude?: number | string;
        accuracy?: number | string | null;
    }): Promise<{
        id: string;
        updatedAt: Date;
        userId: string;
        latitude: number;
        longitude: number;
        accuracy: number | null;
        lastSharedAt: Date;
    }>;
    myLocation(user: AuthenticatedUser): Promise<{
        id: string;
        updatedAt: Date;
        userId: string;
        latitude: number;
        longitude: number;
        accuracy: number | null;
        lastSharedAt: Date;
    } | null>;
}
