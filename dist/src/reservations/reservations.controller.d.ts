import type { AuthenticatedUser } from '../auth/auth.types';
import { ReservationsService } from './reservations.service';
export declare class ReservationsController {
    private readonly reservationsService;
    constructor(reservationsService: ReservationsService);
    inbox(user: AuthenticatedUser, status?: string): Promise<{
        id: string;
        listingId: string;
        listingTitle: string;
        listingType: import(".prisma/client").$Enums.ListingType;
        city: string;
        district: string;
        listingIsActive: boolean;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        message: string | null;
        startDate: Date | null;
        endDate: Date | null;
        careReport: {
            id: string;
            authorSitterId: string;
            summary: string;
            publishedAt: Date;
            updatedAt: Date;
        } | null;
        createdAt: Date;
        updatedAt: Date;
        applicant: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            fullName: string;
            avatarUrl: string;
        };
        listingOwner: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            fullName: string;
            avatarUrl: string;
        };
    }[]>;
    outbox(user: AuthenticatedUser, status?: string): Promise<{
        id: string;
        listingId: string;
        listingTitle: string;
        listingType: import(".prisma/client").$Enums.ListingType;
        city: string;
        district: string;
        listingIsActive: boolean;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        message: string | null;
        startDate: Date | null;
        endDate: Date | null;
        careReport: {
            id: string;
            authorSitterId: string;
            summary: string;
            publishedAt: Date;
            updatedAt: Date;
        } | null;
        createdAt: Date;
        updatedAt: Date;
        applicant: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            fullName: string;
            avatarUrl: string;
        };
        listingOwner: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            fullName: string;
            avatarUrl: string;
        };
    }[]>;
    create(user: AuthenticatedUser, body: {
        listingId?: string;
        startDate?: string;
        endDate?: string;
        message?: string;
    }): Promise<{
        id: string;
        listingId: string;
        listingTitle: string;
        listingType: import(".prisma/client").$Enums.ListingType;
        city: string;
        district: string;
        listingIsActive: boolean;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        message: string | null;
        startDate: Date | null;
        endDate: Date | null;
        careReport: {
            id: string;
            authorSitterId: string;
            summary: string;
            publishedAt: Date;
            updatedAt: Date;
        } | null;
        createdAt: Date;
        updatedAt: Date;
        applicant: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            fullName: string;
            avatarUrl: string;
        };
        listingOwner: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            fullName: string;
            avatarUrl: string;
        };
    }>;
    decide(user: AuthenticatedUser, id: string, body: {
        action?: string;
    }): Promise<{
        id: string;
        listingId: string;
        listingTitle: string;
        listingType: import(".prisma/client").$Enums.ListingType;
        city: string;
        district: string;
        listingIsActive: boolean;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        message: string | null;
        startDate: Date | null;
        endDate: Date | null;
        careReport: {
            id: string;
            authorSitterId: string;
            summary: string;
            publishedAt: Date;
            updatedAt: Date;
        } | null;
        createdAt: Date;
        updatedAt: Date;
        applicant: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            fullName: string;
            avatarUrl: string;
        };
        listingOwner: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            fullName: string;
            avatarUrl: string;
        };
    }>;
    cancel(user: AuthenticatedUser, id: string): Promise<{
        id: string;
        listingId: string;
        listingTitle: string;
        listingType: import(".prisma/client").$Enums.ListingType;
        city: string;
        district: string;
        listingIsActive: boolean;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        message: string | null;
        startDate: Date | null;
        endDate: Date | null;
        careReport: {
            id: string;
            authorSitterId: string;
            summary: string;
            publishedAt: Date;
            updatedAt: Date;
        } | null;
        createdAt: Date;
        updatedAt: Date;
        applicant: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            fullName: string;
            avatarUrl: string;
        };
        listingOwner: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            fullName: string;
            avatarUrl: string;
        };
    }>;
    getReport(user: AuthenticatedUser, id: string): Promise<{
        report: {
            id: string;
            applicationId: string;
            authorSitterId: string;
            summary: string;
            mediaUrls: string[];
            feedingNotes: string | null;
            activityNotes: string | null;
            toiletNotes: string | null;
            medicationNotes: string | null;
            publishedAt: Date;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        canWrite: boolean;
    }>;
    upsertReport(user: AuthenticatedUser, id: string, body: {
        summary?: string;
        mediaUrls?: string[];
        feedingNotes?: string;
        activityNotes?: string;
        toiletNotes?: string;
        medicationNotes?: string;
    }): Promise<{
        report: {
            id: string;
            applicationId: string;
            authorSitterId: string;
            summary: string;
            mediaUrls: string[];
            feedingNotes: string | null;
            activityNotes: string | null;
            toiletNotes: string | null;
            medicationNotes: string | null;
            publishedAt: Date;
            createdAt: Date;
            updatedAt: Date;
        };
        canWrite: boolean;
    }>;
    getSitterAvailability(sitterId: string, from?: string, to?: string): Promise<{
        sitterId: string;
        from: string;
        to: string;
        days: {
            date: string;
            isAvailable: boolean;
            isBooked: boolean;
            isCustom: boolean;
        }[];
    }>;
    setMyAvailability(user: AuthenticatedUser, body: {
        days?: Array<{
            date?: string;
            isAvailable?: boolean;
        }>;
    }): Promise<{
        sitterId: string;
        from: string;
        to: string;
        days: {
            date: string;
            isAvailable: boolean;
            isBooked: boolean;
            isCustom: boolean;
        }[];
    }>;
}
