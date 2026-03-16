import type { AuthenticatedUser } from '../auth/auth.types';
import { MessagesService } from '../messages/messages.service';
import { PrismaService } from '../prisma/prisma.service';
type AvailabilityDayInput = {
    date?: string;
    isAvailable?: boolean;
};
type CareReportInput = {
    summary?: string;
    mediaUrls?: string[];
    feedingNotes?: string;
    activityNotes?: string;
    toiletNotes?: string;
    medicationNotes?: string;
};
export declare class ReservationsService {
    private readonly prisma;
    private readonly messagesService;
    constructor(prisma: PrismaService, messagesService: MessagesService);
    getInbox(user: AuthenticatedUser, rawStatus?: string): Promise<{
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
    getOutbox(user: AuthenticatedUser, rawStatus?: string): Promise<{
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
    createReservation(user: AuthenticatedUser, input: {
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
    decideReservation(user: AuthenticatedUser, applicationId: string, rawAction?: string): Promise<{
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
    cancelReservation(user: AuthenticatedUser, applicationId: string): Promise<{
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
    getReservationReport(user: AuthenticatedUser, applicationId: string): Promise<{
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
    upsertReservationReport(user: AuthenticatedUser, applicationId: string, input: CareReportInput): Promise<{
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
    getSitterAvailability(sitterId: string, rawFrom?: string, rawTo?: string): Promise<{
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
    setMyAvailability(user: AuthenticatedUser, rawDays: AvailabilityDayInput[]): Promise<{
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
    private applicationInclude;
    private mapApplication;
    private getUserDisplayName;
    private getUserAvatar;
    private getCareReportContext;
    private resolveOwnerUserIdForContext;
    private resolveSitterUserIdForContext;
    private assertCanReadCareReport;
    private canWriteCareReport;
    private assertCanWriteCareReport;
    private normalizeCareReportInput;
    private normalizeOptionalReportText;
    private mapCareReport;
    private buildCareReportSummaryMessage;
    private parseStatus;
    private parseDecision;
    private parseDay;
    private parseAvailabilityRange;
    private assertDateRange;
    private normalizeMessage;
    private eachDay;
    private toDayKey;
    private resolveSitterIdForListing;
    private assertSitterRangeAvailable;
}
export {};
