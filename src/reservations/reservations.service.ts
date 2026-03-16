import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import {
    ApplicationStatus,
    ListingType,
    Prisma,
    UserRole,
    type ListingApplication,
} from '@prisma/client';
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

@Injectable()
export class ReservationsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly messagesService: MessagesService,
    ) { }

    async getInbox(user: AuthenticatedUser, rawStatus?: string) {
        const status = this.parseStatus(rawStatus);

        const applications = await this.prisma.listingApplication.findMany({
            where: {
                listing: {
                    publishedByUserId: user.id,
                },
                status: status ?? undefined,
            },
            include: this.applicationInclude(),
            orderBy: [{ createdAt: 'desc' }],
        });

        return applications.map((application) => this.mapApplication(application));
    }

    async getOutbox(user: AuthenticatedUser, rawStatus?: string) {
        const status = this.parseStatus(rawStatus);

        const applications = await this.prisma.listingApplication.findMany({
            where: {
                applicantId: user.id,
                status: status ?? undefined,
            },
            include: this.applicationInclude(),
            orderBy: [{ createdAt: 'desc' }],
        });

        return applications.map((application) => this.mapApplication(application));
    }

    async createReservation(
        user: AuthenticatedUser,
        input: {
            listingId?: string;
            startDate?: string;
            endDate?: string;
            message?: string;
        },
    ) {
        if (typeof input.listingId !== 'string') {
            throw new BadRequestException('listingId must be a string');
        }

        const listingId = input.listingId.trim();
        if (!listingId) {
            throw new BadRequestException('listingId is required');
        }

        const listing = await this.prisma.listing.findUnique({
            where: { id: listingId },
            include: {
                publishedByUser: {
                    select: {
                        id: true,
                        role: true,
                        email: true,
                        ownerProfile: {
                            select: {
                                fullName: true,
                                avatarUrl: true,
                            },
                        },
                        sitterProfile: {
                            select: {
                                fullName: true,
                                avatarUrl: true,
                            },
                        },
                    },
                },
            },
        });

        if (!listing) {
            throw new NotFoundException('Listing not found');
        }

        if (!listing.isActive) {
            throw new BadRequestException('Listing is not active');
        }

        if (listing.publishedByUserId === user.id) {
            throw new BadRequestException('You cannot reserve your own listing');
        }

        const startDate = this.parseDay(input.startDate, 'startDate');
        const endDate = this.parseDay(input.endDate, 'endDate');
        this.assertDateRange(startDate, endDate);

        const existingActiveReservation = await this.prisma.listingApplication.findFirst({
            where: {
                listingId: listing.id,
                applicantId: user.id,
                status: {
                    in: [ApplicationStatus.PENDING, ApplicationStatus.ACCEPTED],
                },
            },
            select: { id: true },
        });

        if (existingActiveReservation) {
            throw new BadRequestException('You already have an active reservation for this listing');
        }

        const sitterId = await this.resolveSitterIdForReservation({
            listingId: listing.id,
            listingType: listing.listingType,
            publishedByUserId: listing.publishedByUserId,
            applicantId: user.id,
            sitterId: listing.sitterId,
        });
        if (sitterId) {
            await this.assertSitterRangeAvailable(sitterId, startDate, endDate);
        }

        const message = this.normalizeMessage(input.message);

        try {
            const created = await this.prisma.listingApplication.create({
                data: {
                    listingId: listing.id,
                    applicantId: user.id,
                    message,
                    startDate,
                    endDate,
                },
                include: this.applicationInclude(),
            });

            return this.mapApplication(created);
        } catch (error) {
            // Backward-compatible guard for environments where old unique
            // constraint (listingId, applicantId) may still exist.
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new BadRequestException(
                    'A reservation already exists for this listing and account',
                );
            }

            throw error;
        }
    }

    async createReservationFromThread(
        user: AuthenticatedUser,
        threadId: string,
        input: {
            startDate?: string;
            endDate?: string;
            message?: string;
        },
    ) {
        const thread = await this.prisma.messageThread.findFirst({
            where: {
                id: threadId,
                OR: [{ ownerUserId: user.id }, { sitterUserId: user.id }],
            },
            select: {
                id: true,
                listingId: true,
                ownerUserId: true,
                sitterUserId: true,
            },
        });

        if (!thread) {
            throw new NotFoundException('Message thread not found');
        }

        if (!thread.listingId) {
            throw new BadRequestException('This conversation has no listing context for reservation');
        }

        await this.assertThreadListingCompatibility(
            thread.listingId,
            thread.ownerUserId,
            thread.sitterUserId,
        );

        const fallbackMessage = 'Mesajlasma uzerinden rezervasyon teklifi olusturuldu.';

        return this.createReservation(user, {
            listingId: thread.listingId,
            startDate: input.startDate,
            endDate: input.endDate,
            message: input.message?.trim() || fallbackMessage,
        });
    }

    async decideReservation(user: AuthenticatedUser, applicationId: string, rawAction?: string) {
        const action = this.parseDecision(rawAction);

        const application = await this.prisma.listingApplication.findUnique({
            where: { id: applicationId },
            include: this.applicationInclude(),
        });

        if (!application) {
            throw new NotFoundException('Reservation not found');
        }

        if (application.listing.publishedByUserId !== user.id) {
            throw new ForbiddenException('Only listing owner can decide this reservation');
        }

        if (application.status !== ApplicationStatus.PENDING) {
            throw new BadRequestException('Only pending reservations can be decided');
        }

        if (action === 'REJECT') {
            const rejected = await this.prisma.listingApplication.update({
                where: { id: application.id },
                data: { status: ApplicationStatus.REJECTED },
                include: this.applicationInclude(),
            });

            return this.mapApplication(rejected);
        }

        const startDate = application.startDate;
        const endDate = application.endDate;

        if (!startDate || !endDate) {
            throw new BadRequestException('Reservation date range is missing');
        }

        const sitterId = await this.resolveSitterIdForReservation({
            listingId: application.listingId,
            listingType: application.listing.listingType,
            publishedByUserId: application.listing.publishedByUserId,
            applicantId: application.applicantId,
            sitterId: application.listing.sitterId,
        });

        await this.prisma.$transaction(async (tx) => {
            const acceptedForListing = await tx.listingApplication.findFirst({
                where: {
                    listingId: application.listingId,
                    status: ApplicationStatus.ACCEPTED,
                    id: { not: application.id },
                },
                select: { id: true },
            });

            if (acceptedForListing) {
                throw new BadRequestException('Another reservation is already accepted for this listing');
            }

            if (sitterId) {
                await this.assertSitterRangeAvailable(sitterId, startDate, endDate, application.id, tx);
            }

            await tx.listingApplication.update({
                where: { id: application.id },
                data: { status: ApplicationStatus.ACCEPTED },
            });

            await tx.listingApplication.updateMany({
                where: {
                    listingId: application.listingId,
                    id: { not: application.id },
                    status: ApplicationStatus.PENDING,
                },
                data: { status: ApplicationStatus.REJECTED },
            });

            await tx.listing.update({
                where: { id: application.listingId },
                data: { isActive: false },
            });
        });

        const updated = await this.prisma.listingApplication.findUnique({
            where: { id: application.id },
            include: this.applicationInclude(),
        });

        if (!updated) {
            throw new NotFoundException('Reservation not found after update');
        }

        return this.mapApplication(updated);
    }

    async cancelReservation(user: AuthenticatedUser, applicationId: string) {
        const application = await this.prisma.listingApplication.findUnique({
            where: { id: applicationId },
            include: this.applicationInclude(),
        });

        if (!application) {
            throw new NotFoundException('Reservation not found');
        }

        const isApplicant = application.applicantId === user.id;
        const isListingOwner = application.listing.publishedByUserId === user.id;

        if (!isApplicant && !isListingOwner) {
            throw new ForbiddenException('Not allowed to cancel this reservation');
        }

        if (
            application.status === ApplicationStatus.CANCELLED ||
            application.status === ApplicationStatus.REJECTED
        ) {
            throw new BadRequestException('Reservation is already closed');
        }

        await this.prisma.$transaction(async (tx) => {
            await tx.listingApplication.update({
                where: { id: application.id },
                data: { status: ApplicationStatus.CANCELLED },
            });

            if (application.status === ApplicationStatus.ACCEPTED) {
                const remainingAccepted = await tx.listingApplication.count({
                    where: {
                        listingId: application.listingId,
                        status: ApplicationStatus.ACCEPTED,
                        id: { not: application.id },
                    },
                });

                if (remainingAccepted === 0) {
                    await tx.listing.update({
                        where: { id: application.listingId },
                        data: { isActive: true },
                    });
                }
            }
        });

        const updated = await this.prisma.listingApplication.findUnique({
            where: { id: application.id },
            include: this.applicationInclude(),
        });

        if (!updated) {
            throw new NotFoundException('Reservation not found after cancel');
        }

        return this.mapApplication(updated);
    }

    async getReservationReport(user: AuthenticatedUser, applicationId: string) {
        const context = await this.getCareReportContext(applicationId);
        this.assertCanReadCareReport(user, context);

        return {
            report: context.application.careReport
                ? this.mapCareReport(context.application.careReport)
                : null,
            canWrite: this.canWriteCareReport(user, context),
        };
    }

    async upsertReservationReport(
        user: AuthenticatedUser,
        applicationId: string,
        input: CareReportInput,
    ) {
        const context = await this.getCareReportContext(applicationId);
        this.assertCanReadCareReport(user, context);
        this.assertCanWriteCareReport(user, context);

        const payload = this.normalizeCareReportInput(input);
        const publishedAt = new Date();

        const report = await this.prisma.careReport.upsert({
            where: { applicationId: context.application.id },
            create: {
                applicationId: context.application.id,
                authorSitterId: user.id,
                summary: payload.summary,
                mediaUrls: payload.mediaUrls,
                feedingNotes: payload.feedingNotes,
                activityNotes: payload.activityNotes,
                toiletNotes: payload.toiletNotes,
                medicationNotes: payload.medicationNotes,
                publishedAt,
            },
            update: {
                authorSitterId: user.id,
                summary: payload.summary,
                mediaUrls: payload.mediaUrls,
                feedingNotes: payload.feedingNotes,
                activityNotes: payload.activityNotes,
                toiletNotes: payload.toiletNotes,
                medicationNotes: payload.medicationNotes,
                publishedAt,
            },
        });

        if (context.ownerUserId) {
            await this.messagesService.startConversation(user, {
                ownerId: context.ownerUserId,
                listingId: context.application.listingId,
                initialMessage: this.buildCareReportSummaryMessage(
                    context.application.listing.title,
                    report.summary,
                    report.mediaUrls.length,
                    report.publishedAt,
                ),
            });
        }

        return {
            report: this.mapCareReport(report),
            canWrite: true,
        };
    }

    async getSitterAvailability(sitterId: string, rawFrom?: string, rawTo?: string) {
        const sitter = await this.prisma.sitter.findUnique({
            where: { id: sitterId },
            select: { id: true },
        });

        if (!sitter) {
            throw new NotFoundException('Sitter not found');
        }

        const { from, to } = this.parseAvailabilityRange(rawFrom, rawTo);

        const [customDays, bookedReservations] = await Promise.all([
            this.prisma.sitterAvailabilityDay.findMany({
                where: {
                    sitterId,
                    date: {
                        gte: from,
                        lte: to,
                    },
                },
                orderBy: { date: 'asc' },
            }),
            this.prisma.listingApplication.findMany({
                where: {
                    status: ApplicationStatus.ACCEPTED,
                    startDate: { lte: to },
                    endDate: { gte: from },
                    listing: {
                        sitterId,
                    },
                },
                select: {
                    startDate: true,
                    endDate: true,
                },
            }),
        ]);

        const customMap = new Map<string, boolean>();
        for (const item of customDays) {
            customMap.set(this.toDayKey(item.date), item.isAvailable);
        }

        const bookedSet = new Set<string>();
        for (const reservation of bookedReservations) {
            if (!reservation.startDate || !reservation.endDate) {
                continue;
            }

            for (const day of this.eachDay(reservation.startDate, reservation.endDate)) {
                bookedSet.add(this.toDayKey(day));
            }
        }

        const days = this.eachDay(from, to).map((day) => {
            const key = this.toDayKey(day);
            const customAvailability = customMap.get(key);
            const isBooked = bookedSet.has(key);
            const isAvailable = !isBooked && customAvailability !== false;

            return {
                date: key,
                isAvailable,
                isBooked,
                isCustom: customAvailability !== undefined,
            };
        });

        return {
            sitterId,
            from: this.toDayKey(from),
            to: this.toDayKey(to),
            days,
        };
    }

    async setMyAvailability(user: AuthenticatedUser, rawDays: AvailabilityDayInput[]) {
        if (!Array.isArray(rawDays) || rawDays.length === 0) {
            throw new BadRequestException('days[] is required');
        }

        if (rawDays.length > 90) {
            throw new BadRequestException('Too many availability updates in one request');
        }

        const sitter = await this.ensureSitterProfileForUser(user.id);

        const normalizedDays = rawDays.map((day, index) => {
            const date = this.parseDay(day.date, `days[${index}].date`);

            if (typeof day.isAvailable !== 'boolean') {
                throw new BadRequestException(`days[${index}].isAvailable must be boolean`);
            }

            return {
                date,
                isAvailable: day.isAvailable,
            };
        });

        await this.prisma.$transaction(
            normalizedDays.map((day) =>
                this.prisma.sitterAvailabilityDay.upsert({
                    where: {
                        sitterId_date: {
                            sitterId: sitter.id,
                            date: day.date,
                        },
                    },
                    create: {
                        sitterId: sitter.id,
                        date: day.date,
                        isAvailable: day.isAvailable,
                    },
                    update: {
                        isAvailable: day.isAvailable,
                    },
                }),
            ),
        );

        const sortedDays = [...normalizedDays].sort((a, b) => a.date.getTime() - b.date.getTime());
        const from = sortedDays[0].date;
        const to = sortedDays[sortedDays.length - 1].date;

        return this.getSitterAvailability(sitter.id, this.toDayKey(from), this.toDayKey(to));
    }

    private applicationInclude() {
        return {
            listing: {
                select: {
                    id: true,
                    title: true,
                    listingType: true,
                    city: true,
                    district: true,
                    isActive: true,
                    publishedByUserId: true,
                    sitterId: true,
                    publishedByUser: {
                        select: {
                            id: true,
                            email: true,
                            role: true,
                            ownerProfile: {
                                select: {
                                    fullName: true,
                                    avatarUrl: true,
                                },
                            },
                            sitterProfile: {
                                select: {
                                    fullName: true,
                                    avatarUrl: true,
                                },
                            },
                        },
                    },
                },
            },
            careReport: {
                select: {
                    id: true,
                    authorSitterId: true,
                    summary: true,
                    publishedAt: true,
                    updatedAt: true,
                },
            },
            applicant: {
                select: {
                    id: true,
                    email: true,
                    role: true,
                    ownerProfile: {
                        select: {
                            fullName: true,
                            avatarUrl: true,
                        },
                    },
                    sitterProfile: {
                        select: {
                            fullName: true,
                            avatarUrl: true,
                        },
                    },
                },
            },
        } as const;
    }

    private mapApplication(application: ListingApplication & {
        listing: {
            id: string;
            title: string;
            listingType: ListingType;
            city: string;
            district: string;
            isActive: boolean;
            publishedByUserId: string;
            publishedByUser: {
                id: string;
                email: string;
                role: UserRole;
                ownerProfile: { fullName: string; avatarUrl: string } | null;
                sitterProfile: { fullName: string; avatarUrl: string } | null;
            };
        };
        applicant: {
            id: string;
            email: string;
            role: UserRole;
            ownerProfile: { fullName: string; avatarUrl: string } | null;
            sitterProfile: { fullName: string; avatarUrl: string } | null;
        };
        careReport: {
            id: string;
            authorSitterId: string;
            summary: string;
            publishedAt: Date;
            updatedAt: Date;
        } | null;
    }) {
        return {
            id: application.id,
            listingId: application.listing.id,
            listingTitle: application.listing.title,
            listingType: application.listing.listingType,
            city: application.listing.city,
            district: application.listing.district,
            listingIsActive: application.listing.isActive,
            status: application.status,
            message: application.message,
            startDate: application.startDate,
            endDate: application.endDate,
            careReport: application.careReport
                ? {
                    id: application.careReport.id,
                    authorSitterId: application.careReport.authorSitterId,
                    summary: application.careReport.summary,
                    publishedAt: application.careReport.publishedAt,
                    updatedAt: application.careReport.updatedAt,
                }
                : null,
            createdAt: application.createdAt,
            updatedAt: application.updatedAt,
            applicant: {
                id: application.applicant.id,
                email: application.applicant.email,
                role: application.applicant.role,
                fullName: this.getUserDisplayName(application.applicant),
                avatarUrl: this.getUserAvatar(application.applicant),
            },
            listingOwner: {
                id: application.listing.publishedByUser.id,
                email: application.listing.publishedByUser.email,
                role: application.listing.publishedByUser.role,
                fullName: this.getUserDisplayName(application.listing.publishedByUser),
                avatarUrl: this.getUserAvatar(application.listing.publishedByUser),
            },
        };
    }

    private getUserDisplayName(user: {
        email: string;
        ownerProfile?: { fullName: string } | null;
        sitterProfile?: { fullName: string } | null;
    }) {
        return (
            user.ownerProfile?.fullName ||
            user.sitterProfile?.fullName ||
            user.email.split('@')[0] ||
            'User'
        );
    }

    private getUserAvatar(user: {
        ownerProfile?: { avatarUrl: string } | null;
        sitterProfile?: { avatarUrl: string } | null;
    }) {
        return user.ownerProfile?.avatarUrl || user.sitterProfile?.avatarUrl || '';
    }

    private async getCareReportContext(applicationId: string) {
        const application = await this.prisma.listingApplication.findUnique({
            where: { id: applicationId },
            include: {
                listing: {
                    select: {
                        id: true,
                        title: true,
                        listingType: true,
                        publishedByUserId: true,
                    },
                },
                applicant: {
                    select: {
                        id: true,
                    },
                },
                careReport: {
                    select: {
                        id: true,
                        applicationId: true,
                        authorSitterId: true,
                        summary: true,
                        mediaUrls: true,
                        feedingNotes: true,
                        activityNotes: true,
                        toiletNotes: true,
                        medicationNotes: true,
                        publishedAt: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });

        if (!application) {
            throw new NotFoundException('Reservation not found');
        }

        const ownerUserId = this.resolveOwnerUserIdForContext(application);
        const sitterUserId = this.resolveSitterUserIdForContext(application);

        return {
            application,
            ownerUserId,
            sitterUserId,
        };
    }

    private resolveOwnerUserIdForContext(application: {
        listing: {
            listingType: ListingType;
            publishedByUserId: string;
        };
        applicant: {
            id: string;
        };
    }) {
        if (application.listing.listingType === ListingType.OWNER_REQUEST) {
            return application.listing.publishedByUserId;
        }

        return application.applicant.id;
    }

    private resolveSitterUserIdForContext(application: {
        listing: {
            listingType: ListingType;
            publishedByUserId: string;
        };
        applicant: {
            id: string;
        };
    }) {
        if (application.listing.listingType === ListingType.SITTER_SERVICE) {
            return application.listing.publishedByUserId;
        }

        return application.applicant.id;
    }

    private assertCanReadCareReport(
        user: AuthenticatedUser,
        context: {
            application: {
                applicantId: string;
                listing: { publishedByUserId: string };
            };
        },
    ) {
        if (
            user.id !== context.application.applicantId &&
            user.id !== context.application.listing.publishedByUserId
        ) {
            throw new ForbiddenException('You cannot view report for this reservation');
        }
    }

    private canWriteCareReport(
        user: AuthenticatedUser,
        context: {
            application: {
                status: ApplicationStatus;
            };
            sitterUserId: string | null;
        },
    ) {
        if (!context.sitterUserId || context.sitterUserId !== user.id) {
            return false;
        }

        return (
            context.application.status === ApplicationStatus.ACCEPTED ||
            context.application.status === ApplicationStatus.CANCELLED
        );
    }

    private assertCanWriteCareReport(
        user: AuthenticatedUser,
        context: {
            application: {
                status: ApplicationStatus;
            };
            sitterUserId: string | null;
        },
    ) {
        if (!context.sitterUserId || context.sitterUserId !== user.id) {
            throw new ForbiddenException('Only assigned sitter can write report');
        }

        if (
            context.application.status !== ApplicationStatus.ACCEPTED &&
            context.application.status !== ApplicationStatus.CANCELLED
        ) {
            throw new BadRequestException('Report can be added after reservation is accepted');
        }
    }

    private normalizeCareReportInput(input: CareReportInput) {
        if (typeof input.summary !== 'string') {
            throw new BadRequestException('summary is required');
        }

        const summary = input.summary.trim();
        if (!summary) {
            throw new BadRequestException('summary is required');
        }

        if (summary.length > 2000) {
            throw new BadRequestException('summary is too long');
        }

        if (input.mediaUrls !== undefined && !Array.isArray(input.mediaUrls)) {
            throw new BadRequestException('mediaUrls must be an array of URLs');
        }

        const mediaUrls = (input.mediaUrls ?? []).map((value, index) => {
            if (typeof value !== 'string') {
                throw new BadRequestException(`mediaUrls[${index}] must be string`);
            }

            const normalized = value.trim();

            if (!normalized) {
                throw new BadRequestException(`mediaUrls[${index}] cannot be empty`);
            }

            if (!/^https?:\/\//i.test(normalized)) {
                throw new BadRequestException(`mediaUrls[${index}] must start with http:// or https://`);
            }

            if (normalized.length > 2000) {
                throw new BadRequestException(`mediaUrls[${index}] is too long`);
            }

            return normalized;
        });

        if (mediaUrls.length > 12) {
            throw new BadRequestException('mediaUrls supports up to 12 items');
        }

        return {
            summary,
            mediaUrls,
            feedingNotes: this.normalizeOptionalReportText(input.feedingNotes, 'feedingNotes', 1500),
            activityNotes: this.normalizeOptionalReportText(input.activityNotes, 'activityNotes', 1500),
            toiletNotes: this.normalizeOptionalReportText(input.toiletNotes, 'toiletNotes', 1500),
            medicationNotes: this.normalizeOptionalReportText(
                input.medicationNotes,
                'medicationNotes',
                1500,
            ),
        };
    }

    private normalizeOptionalReportText(value: unknown, fieldName: string, maxLength: number) {
        if (value === undefined || value === null) {
            return null;
        }

        if (typeof value !== 'string') {
            throw new BadRequestException(`${fieldName} must be string`);
        }

        const normalized = value.trim();
        if (!normalized) {
            return null;
        }

        if (normalized.length > maxLength) {
            throw new BadRequestException(`${fieldName} is too long`);
        }

        return normalized;
    }

    private mapCareReport(report: {
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
    }) {
        return {
            id: report.id,
            applicationId: report.applicationId,
            authorSitterId: report.authorSitterId,
            summary: report.summary,
            mediaUrls: report.mediaUrls,
            feedingNotes: report.feedingNotes,
            activityNotes: report.activityNotes,
            toiletNotes: report.toiletNotes,
            medicationNotes: report.medicationNotes,
            publishedAt: report.publishedAt,
            createdAt: report.createdAt,
            updatedAt: report.updatedAt,
        };
    }

    private buildCareReportSummaryMessage(
        listingTitle: string,
        summary: string,
        mediaCount: number,
        publishedAt: Date,
    ) {
        const clippedSummary =
            summary.length > 180 ? `${summary.slice(0, 177)}...` : summary;

        const dateLabel = publishedAt.toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });

        return [
            'Sistem: Bakim raporu paylasildi.',
            `Ilan: ${listingTitle}`,
            `Tarih: ${dateLabel}`,
            `Ozet: ${clippedSummary}`,
            mediaCount > 0 ? `Medya: ${mediaCount} dosya` : null,
        ]
            .filter((line): line is string => Boolean(line))
            .join('\n');
    }

    private parseStatus(rawStatus?: string): ApplicationStatus | null {
        const normalized = rawStatus?.trim().toUpperCase();
        if (!normalized) {
            return null;
        }

        if (!(normalized in ApplicationStatus)) {
            throw new BadRequestException('Invalid status');
        }

        return ApplicationStatus[normalized as keyof typeof ApplicationStatus];
    }

    private parseDecision(rawAction?: string): 'ACCEPT' | 'REJECT' {
        if (typeof rawAction !== 'string') {
            throw new BadRequestException('action must be ACCEPT or REJECT');
        }

        const normalized = rawAction.trim().toUpperCase();
        if (normalized === 'ACCEPT' || normalized === 'REJECT') {
            return normalized;
        }

        throw new BadRequestException('action must be ACCEPT or REJECT');
    }

    private parseDay(raw: string | undefined, fieldName: string): Date {
        if (typeof raw !== 'string') {
            throw new BadRequestException(`${fieldName} is required in YYYY-MM-DD format`);
        }

        const value = raw.trim();
        if (!value) {
            throw new BadRequestException(`${fieldName} is required in YYYY-MM-DD format`);
        }

        const dayRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
        const match = dayRegex.exec(value);

        if (!match) {
            throw new BadRequestException(`${fieldName} must be YYYY-MM-DD`);
        }

        const year = Number(match[1]);
        const month = Number(match[2]);
        const day = Number(match[3]);

        const parsed = new Date(Date.UTC(year, month - 1, day));

        if (
            Number.isNaN(parsed.getTime()) ||
            parsed.getUTCFullYear() !== year ||
            parsed.getUTCMonth() !== month - 1 ||
            parsed.getUTCDate() !== day
        ) {
            throw new BadRequestException(`${fieldName} is not a valid calendar day`);
        }

        return parsed;
    }

    private parseAvailabilityRange(rawFrom?: string, rawTo?: string) {
        const today = new Date();
        const todayUtc = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

        const from = rawFrom ? this.parseDay(rawFrom, 'from') : todayUtc;

        const defaultTo = new Date(from);
        defaultTo.setUTCDate(defaultTo.getUTCDate() + 13);

        const to = rawTo ? this.parseDay(rawTo, 'to') : defaultTo;

        this.assertDateRange(from, to);

        const rangeLength = this.eachDay(from, to).length;
        if (rangeLength > 60) {
            throw new BadRequestException('Availability range can be at most 60 days');
        }

        return { from, to };
    }

    private assertDateRange(startDate: Date, endDate: Date) {
        if (endDate.getTime() < startDate.getTime()) {
            throw new BadRequestException('endDate must be equal or after startDate');
        }

        const dayCount = this.eachDay(startDate, endDate).length;
        if (dayCount > 30) {
            throw new BadRequestException('Reservation range can be at most 30 days');
        }
    }

    private normalizeMessage(rawMessage?: string) {
        if (!rawMessage) {
            return null;
        }

        const value = rawMessage.trim();
        if (!value) {
            return null;
        }

        if (value.length > 1200) {
            throw new BadRequestException('message is too long');
        }

        return value;
    }

    private eachDay(startDate: Date, endDate: Date) {
        const days: Date[] = [];
        const cursor = new Date(startDate);

        while (cursor.getTime() <= endDate.getTime()) {
            days.push(new Date(cursor));
            cursor.setUTCDate(cursor.getUTCDate() + 1);
        }

        return days;
    }

    private toDayKey(date: Date) {
        const year = String(date.getUTCFullYear());
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    private async resolveSitterIdForReservation(input: {
        listingId: string;
        listingType: ListingType;
        publishedByUserId: string;
        applicantId: string;
        sitterId?: string | null;
    }) {
        if (input.listingType === ListingType.OWNER_REQUEST) {
            const sitter = await this.ensureSitterProfileForUser(input.applicantId);
            return sitter.id;
        }

        if (input.sitterId) {
            return input.sitterId;
        }

        const sitter = await this.ensureSitterProfileForUser(input.publishedByUserId);
        return sitter.id;
    }

    private async ensureSitterProfileForUser(userId: string) {
        const existing = await this.prisma.sitter.findUnique({
            where: { userId },
            select: { id: true },
        });

        if (existing) {
            return existing;
        }

        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                email: true,
                ownerProfile: {
                    select: {
                        fullName: true,
                        city: true,
                        district: true,
                        avatarUrl: true,
                        about: true,
                        averageRating: true,
                    },
                },
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.prisma.sitter.create({
            data: {
                userId,
                fullName: user.ownerProfile?.fullName || user.email.split('@')[0] || 'Kullanici',
                city: user.ownerProfile?.city || '',
                district: user.ownerProfile?.district || user.ownerProfile?.city || '',
                about: user.ownerProfile?.about || '',
                yearsExperience: 0,
                identityVerified: false,
                repeatClientRate: 0,
                galleryImageUrls: [],
                rating: user.ownerProfile?.averageRating ?? 0,
                reviewCount: 0,
                pricePerDay: 350,
                pricePerHour: 120,
                avatarUrl: user.ownerProfile?.avatarUrl || '',
                isFeatured: false,
                tags: [],
            },
            select: { id: true },
        });
    }

    private async assertThreadListingCompatibility(
        listingId: string,
        ownerUserId: string | null,
        sitterUserId: string | null,
    ) {
        const listing = await this.prisma.listing.findUnique({
            where: { id: listingId },
            select: {
                listingType: true,
                publishedByUserId: true,
            },
        });

        if (!listing) {
            throw new NotFoundException('Listing not found');
        }

        if (listing.listingType === ListingType.OWNER_REQUEST) {
            if (!ownerUserId || listing.publishedByUserId !== ownerUserId) {
                throw new BadRequestException('Thread listing context is inconsistent');
            }

            return;
        }

        if (!sitterUserId || listing.publishedByUserId !== sitterUserId) {
            throw new BadRequestException('Thread listing context is inconsistent');
        }
    }

    private async assertSitterRangeAvailable(
        sitterId: string,
        startDate: Date,
        endDate: Date,
        excludeApplicationId?: string,
        tx: PrismaService | Prisma.TransactionClient = this.prisma,
    ) {
        const [unavailableDays, overlappingAccepted] = await Promise.all([
            tx.sitterAvailabilityDay.findFirst({
                where: {
                    sitterId,
                    date: {
                        gte: startDate,
                        lte: endDate,
                    },
                    isAvailable: false,
                },
                orderBy: { date: 'asc' },
            }),
            tx.listingApplication.findFirst({
                where: {
                    id: excludeApplicationId ? { not: excludeApplicationId } : undefined,
                    status: ApplicationStatus.ACCEPTED,
                    startDate: { lte: endDate },
                    endDate: { gte: startDate },
                    listing: {
                        sitterId,
                    },
                },
                select: {
                    id: true,
                },
            }),
        ]);

        if (unavailableDays) {
            throw new BadRequestException(
                `Sitter is unavailable on ${this.toDayKey(unavailableDays.date)}`,
            );
        }

        if (overlappingAccepted) {
            throw new BadRequestException('Sitter already has an accepted reservation in this range');
        }
    }
}
