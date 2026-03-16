"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const messages_service_1 = require("../messages/messages.service");
const prisma_service_1 = require("../prisma/prisma.service");
let ReservationsService = class ReservationsService {
    prisma;
    messagesService;
    constructor(prisma, messagesService) {
        this.prisma = prisma;
        this.messagesService = messagesService;
    }
    async getInbox(user, rawStatus) {
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
    async getOutbox(user, rawStatus) {
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
    async createReservation(user, input) {
        if (typeof input.listingId !== 'string') {
            throw new common_1.BadRequestException('listingId must be a string');
        }
        const listingId = input.listingId.trim();
        if (!listingId) {
            throw new common_1.BadRequestException('listingId is required');
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
            throw new common_1.NotFoundException('Listing not found');
        }
        if (!listing.isActive) {
            throw new common_1.BadRequestException('Listing is not active');
        }
        if (listing.publishedByUserId === user.id) {
            throw new common_1.BadRequestException('You cannot reserve your own listing');
        }
        if (listing.listingType === client_1.ListingType.OWNER_REQUEST && user.role !== client_1.UserRole.SITTER) {
            throw new common_1.BadRequestException('Only sitters can apply owner requests');
        }
        if (listing.listingType === client_1.ListingType.SITTER_SERVICE && user.role !== client_1.UserRole.OWNER) {
            throw new common_1.BadRequestException('Only owners can reserve sitter services');
        }
        const startDate = this.parseDay(input.startDate, 'startDate');
        const endDate = this.parseDay(input.endDate, 'endDate');
        this.assertDateRange(startDate, endDate);
        const existingActiveReservation = await this.prisma.listingApplication.findFirst({
            where: {
                listingId: listing.id,
                applicantId: user.id,
                status: {
                    in: [client_1.ApplicationStatus.PENDING, client_1.ApplicationStatus.ACCEPTED],
                },
            },
            select: { id: true },
        });
        if (existingActiveReservation) {
            throw new common_1.BadRequestException('You already have an active reservation for this listing');
        }
        const sitterId = await this.resolveSitterIdForListing(listing.id);
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
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002') {
                throw new common_1.BadRequestException('A reservation already exists for this listing and account');
            }
            throw error;
        }
    }
    async decideReservation(user, applicationId, rawAction) {
        const action = this.parseDecision(rawAction);
        const application = await this.prisma.listingApplication.findUnique({
            where: { id: applicationId },
            include: this.applicationInclude(),
        });
        if (!application) {
            throw new common_1.NotFoundException('Reservation not found');
        }
        if (application.listing.publishedByUserId !== user.id) {
            throw new common_1.ForbiddenException('Only listing owner can decide this reservation');
        }
        if (application.status !== client_1.ApplicationStatus.PENDING) {
            throw new common_1.BadRequestException('Only pending reservations can be decided');
        }
        if (action === 'REJECT') {
            const rejected = await this.prisma.listingApplication.update({
                where: { id: application.id },
                data: { status: client_1.ApplicationStatus.REJECTED },
                include: this.applicationInclude(),
            });
            return this.mapApplication(rejected);
        }
        const startDate = application.startDate;
        const endDate = application.endDate;
        if (!startDate || !endDate) {
            throw new common_1.BadRequestException('Reservation date range is missing');
        }
        const sitterId = await this.resolveSitterIdForListing(application.listingId);
        await this.prisma.$transaction(async (tx) => {
            const acceptedForListing = await tx.listingApplication.findFirst({
                where: {
                    listingId: application.listingId,
                    status: client_1.ApplicationStatus.ACCEPTED,
                    id: { not: application.id },
                },
                select: { id: true },
            });
            if (acceptedForListing) {
                throw new common_1.BadRequestException('Another reservation is already accepted for this listing');
            }
            if (sitterId) {
                await this.assertSitterRangeAvailable(sitterId, startDate, endDate, application.id, tx);
            }
            await tx.listingApplication.update({
                where: { id: application.id },
                data: { status: client_1.ApplicationStatus.ACCEPTED },
            });
            await tx.listingApplication.updateMany({
                where: {
                    listingId: application.listingId,
                    id: { not: application.id },
                    status: client_1.ApplicationStatus.PENDING,
                },
                data: { status: client_1.ApplicationStatus.REJECTED },
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
            throw new common_1.NotFoundException('Reservation not found after update');
        }
        return this.mapApplication(updated);
    }
    async cancelReservation(user, applicationId) {
        const application = await this.prisma.listingApplication.findUnique({
            where: { id: applicationId },
            include: this.applicationInclude(),
        });
        if (!application) {
            throw new common_1.NotFoundException('Reservation not found');
        }
        const isApplicant = application.applicantId === user.id;
        const isListingOwner = application.listing.publishedByUserId === user.id;
        if (!isApplicant && !isListingOwner) {
            throw new common_1.ForbiddenException('Not allowed to cancel this reservation');
        }
        if (application.status === client_1.ApplicationStatus.CANCELLED ||
            application.status === client_1.ApplicationStatus.REJECTED) {
            throw new common_1.BadRequestException('Reservation is already closed');
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.listingApplication.update({
                where: { id: application.id },
                data: { status: client_1.ApplicationStatus.CANCELLED },
            });
            if (application.status === client_1.ApplicationStatus.ACCEPTED) {
                const remainingAccepted = await tx.listingApplication.count({
                    where: {
                        listingId: application.listingId,
                        status: client_1.ApplicationStatus.ACCEPTED,
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
            throw new common_1.NotFoundException('Reservation not found after cancel');
        }
        return this.mapApplication(updated);
    }
    async getReservationReport(user, applicationId) {
        const context = await this.getCareReportContext(applicationId);
        this.assertCanReadCareReport(user, context);
        return {
            report: context.application.careReport
                ? this.mapCareReport(context.application.careReport)
                : null,
            canWrite: this.canWriteCareReport(user, context),
        };
    }
    async upsertReservationReport(user, applicationId, input) {
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
                initialMessage: this.buildCareReportSummaryMessage(context.application.listing.title, report.summary, report.mediaUrls.length, report.publishedAt),
            });
        }
        return {
            report: this.mapCareReport(report),
            canWrite: true,
        };
    }
    async getSitterAvailability(sitterId, rawFrom, rawTo) {
        const sitter = await this.prisma.sitter.findUnique({
            where: { id: sitterId },
            select: { id: true },
        });
        if (!sitter) {
            throw new common_1.NotFoundException('Sitter not found');
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
                    status: client_1.ApplicationStatus.ACCEPTED,
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
        const customMap = new Map();
        for (const item of customDays) {
            customMap.set(this.toDayKey(item.date), item.isAvailable);
        }
        const bookedSet = new Set();
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
    async setMyAvailability(user, rawDays) {
        if (user.role !== client_1.UserRole.SITTER) {
            throw new common_1.ForbiddenException('Only sitters can update availability');
        }
        if (!Array.isArray(rawDays) || rawDays.length === 0) {
            throw new common_1.BadRequestException('days[] is required');
        }
        if (rawDays.length > 90) {
            throw new common_1.BadRequestException('Too many availability updates in one request');
        }
        const sitter = await this.prisma.sitter.findUnique({
            where: { userId: user.id },
            select: { id: true },
        });
        if (!sitter) {
            throw new common_1.NotFoundException('Sitter profile not found');
        }
        const normalizedDays = rawDays.map((day, index) => {
            const date = this.parseDay(day.date, `days[${index}].date`);
            if (typeof day.isAvailable !== 'boolean') {
                throw new common_1.BadRequestException(`days[${index}].isAvailable must be boolean`);
            }
            return {
                date,
                isAvailable: day.isAvailable,
            };
        });
        await this.prisma.$transaction(normalizedDays.map((day) => this.prisma.sitterAvailabilityDay.upsert({
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
        })));
        const sortedDays = [...normalizedDays].sort((a, b) => a.date.getTime() - b.date.getTime());
        const from = sortedDays[0].date;
        const to = sortedDays[sortedDays.length - 1].date;
        return this.getSitterAvailability(sitter.id, this.toDayKey(from), this.toDayKey(to));
    }
    applicationInclude() {
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
        };
    }
    mapApplication(application) {
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
    getUserDisplayName(user) {
        return (user.ownerProfile?.fullName ||
            user.sitterProfile?.fullName ||
            user.email.split('@')[0] ||
            'User');
    }
    getUserAvatar(user) {
        return user.ownerProfile?.avatarUrl || user.sitterProfile?.avatarUrl || '';
    }
    async getCareReportContext(applicationId) {
        const application = await this.prisma.listingApplication.findUnique({
            where: { id: applicationId },
            include: {
                listing: {
                    select: {
                        id: true,
                        title: true,
                        listingType: true,
                        publishedByUserId: true,
                        publishedByUser: {
                            select: {
                                id: true,
                                role: true,
                            },
                        },
                    },
                },
                applicant: {
                    select: {
                        id: true,
                        role: true,
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
            throw new common_1.NotFoundException('Reservation not found');
        }
        const ownerUserId = this.resolveOwnerUserIdForContext(application);
        const sitterUserId = this.resolveSitterUserIdForContext(application);
        return {
            application,
            ownerUserId,
            sitterUserId,
        };
    }
    resolveOwnerUserIdForContext(application) {
        if (application.listing.publishedByUser.role === client_1.UserRole.OWNER) {
            return application.listing.publishedByUserId;
        }
        if (application.applicant.role === client_1.UserRole.OWNER) {
            return application.applicant.id;
        }
        return null;
    }
    resolveSitterUserIdForContext(application) {
        if (application.listing.publishedByUser.role === client_1.UserRole.SITTER) {
            return application.listing.publishedByUserId;
        }
        if (application.applicant.role === client_1.UserRole.SITTER) {
            return application.applicant.id;
        }
        return null;
    }
    assertCanReadCareReport(user, context) {
        if (user.id !== context.application.applicantId &&
            user.id !== context.application.listing.publishedByUserId) {
            throw new common_1.ForbiddenException('You cannot view report for this reservation');
        }
    }
    canWriteCareReport(user, context) {
        if (user.role !== client_1.UserRole.SITTER) {
            return false;
        }
        if (!context.sitterUserId || context.sitterUserId !== user.id) {
            return false;
        }
        return (context.application.status === client_1.ApplicationStatus.ACCEPTED ||
            context.application.status === client_1.ApplicationStatus.CANCELLED);
    }
    assertCanWriteCareReport(user, context) {
        if (user.role !== client_1.UserRole.SITTER) {
            throw new common_1.ForbiddenException('Only sitters can write care reports');
        }
        if (!context.sitterUserId || context.sitterUserId !== user.id) {
            throw new common_1.ForbiddenException('Only assigned sitter can write report');
        }
        if (context.application.status !== client_1.ApplicationStatus.ACCEPTED &&
            context.application.status !== client_1.ApplicationStatus.CANCELLED) {
            throw new common_1.BadRequestException('Report can be added after reservation is accepted');
        }
    }
    normalizeCareReportInput(input) {
        if (typeof input.summary !== 'string') {
            throw new common_1.BadRequestException('summary is required');
        }
        const summary = input.summary.trim();
        if (!summary) {
            throw new common_1.BadRequestException('summary is required');
        }
        if (summary.length > 2000) {
            throw new common_1.BadRequestException('summary is too long');
        }
        if (input.mediaUrls !== undefined && !Array.isArray(input.mediaUrls)) {
            throw new common_1.BadRequestException('mediaUrls must be an array of URLs');
        }
        const mediaUrls = (input.mediaUrls ?? []).map((value, index) => {
            if (typeof value !== 'string') {
                throw new common_1.BadRequestException(`mediaUrls[${index}] must be string`);
            }
            const normalized = value.trim();
            if (!normalized) {
                throw new common_1.BadRequestException(`mediaUrls[${index}] cannot be empty`);
            }
            if (!/^https?:\/\//i.test(normalized)) {
                throw new common_1.BadRequestException(`mediaUrls[${index}] must start with http:// or https://`);
            }
            if (normalized.length > 2000) {
                throw new common_1.BadRequestException(`mediaUrls[${index}] is too long`);
            }
            return normalized;
        });
        if (mediaUrls.length > 12) {
            throw new common_1.BadRequestException('mediaUrls supports up to 12 items');
        }
        return {
            summary,
            mediaUrls,
            feedingNotes: this.normalizeOptionalReportText(input.feedingNotes, 'feedingNotes', 1500),
            activityNotes: this.normalizeOptionalReportText(input.activityNotes, 'activityNotes', 1500),
            toiletNotes: this.normalizeOptionalReportText(input.toiletNotes, 'toiletNotes', 1500),
            medicationNotes: this.normalizeOptionalReportText(input.medicationNotes, 'medicationNotes', 1500),
        };
    }
    normalizeOptionalReportText(value, fieldName, maxLength) {
        if (value === undefined || value === null) {
            return null;
        }
        if (typeof value !== 'string') {
            throw new common_1.BadRequestException(`${fieldName} must be string`);
        }
        const normalized = value.trim();
        if (!normalized) {
            return null;
        }
        if (normalized.length > maxLength) {
            throw new common_1.BadRequestException(`${fieldName} is too long`);
        }
        return normalized;
    }
    mapCareReport(report) {
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
    buildCareReportSummaryMessage(listingTitle, summary, mediaCount, publishedAt) {
        const clippedSummary = summary.length > 180 ? `${summary.slice(0, 177)}...` : summary;
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
            .filter((line) => Boolean(line))
            .join('\n');
    }
    parseStatus(rawStatus) {
        const normalized = rawStatus?.trim().toUpperCase();
        if (!normalized) {
            return null;
        }
        if (!(normalized in client_1.ApplicationStatus)) {
            throw new common_1.BadRequestException('Invalid status');
        }
        return client_1.ApplicationStatus[normalized];
    }
    parseDecision(rawAction) {
        if (typeof rawAction !== 'string') {
            throw new common_1.BadRequestException('action must be ACCEPT or REJECT');
        }
        const normalized = rawAction.trim().toUpperCase();
        if (normalized === 'ACCEPT' || normalized === 'REJECT') {
            return normalized;
        }
        throw new common_1.BadRequestException('action must be ACCEPT or REJECT');
    }
    parseDay(raw, fieldName) {
        if (typeof raw !== 'string') {
            throw new common_1.BadRequestException(`${fieldName} is required in YYYY-MM-DD format`);
        }
        const value = raw.trim();
        if (!value) {
            throw new common_1.BadRequestException(`${fieldName} is required in YYYY-MM-DD format`);
        }
        const dayRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
        const match = dayRegex.exec(value);
        if (!match) {
            throw new common_1.BadRequestException(`${fieldName} must be YYYY-MM-DD`);
        }
        const year = Number(match[1]);
        const month = Number(match[2]);
        const day = Number(match[3]);
        const parsed = new Date(Date.UTC(year, month - 1, day));
        if (Number.isNaN(parsed.getTime()) ||
            parsed.getUTCFullYear() !== year ||
            parsed.getUTCMonth() !== month - 1 ||
            parsed.getUTCDate() !== day) {
            throw new common_1.BadRequestException(`${fieldName} is not a valid calendar day`);
        }
        return parsed;
    }
    parseAvailabilityRange(rawFrom, rawTo) {
        const today = new Date();
        const todayUtc = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
        const from = rawFrom ? this.parseDay(rawFrom, 'from') : todayUtc;
        const defaultTo = new Date(from);
        defaultTo.setUTCDate(defaultTo.getUTCDate() + 13);
        const to = rawTo ? this.parseDay(rawTo, 'to') : defaultTo;
        this.assertDateRange(from, to);
        const rangeLength = this.eachDay(from, to).length;
        if (rangeLength > 60) {
            throw new common_1.BadRequestException('Availability range can be at most 60 days');
        }
        return { from, to };
    }
    assertDateRange(startDate, endDate) {
        if (endDate.getTime() < startDate.getTime()) {
            throw new common_1.BadRequestException('endDate must be equal or after startDate');
        }
        const dayCount = this.eachDay(startDate, endDate).length;
        if (dayCount > 30) {
            throw new common_1.BadRequestException('Reservation range can be at most 30 days');
        }
    }
    normalizeMessage(rawMessage) {
        if (!rawMessage) {
            return null;
        }
        const value = rawMessage.trim();
        if (!value) {
            return null;
        }
        if (value.length > 1200) {
            throw new common_1.BadRequestException('message is too long');
        }
        return value;
    }
    eachDay(startDate, endDate) {
        const days = [];
        const cursor = new Date(startDate);
        while (cursor.getTime() <= endDate.getTime()) {
            days.push(new Date(cursor));
            cursor.setUTCDate(cursor.getUTCDate() + 1);
        }
        return days;
    }
    toDayKey(date) {
        const year = String(date.getUTCFullYear());
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    async resolveSitterIdForListing(listingId) {
        const listing = await this.prisma.listing.findUnique({
            where: { id: listingId },
            select: {
                sitterId: true,
                publishedByUserId: true,
                listingType: true,
            },
        });
        if (!listing) {
            return null;
        }
        if (listing.sitterId) {
            return listing.sitterId;
        }
        if (listing.listingType !== client_1.ListingType.SITTER_SERVICE) {
            return null;
        }
        const sitter = await this.prisma.sitter.findUnique({
            where: { userId: listing.publishedByUserId },
            select: { id: true },
        });
        return sitter?.id ?? null;
    }
    async assertSitterRangeAvailable(sitterId, startDate, endDate, excludeApplicationId, tx = this.prisma) {
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
                    status: client_1.ApplicationStatus.ACCEPTED,
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
            throw new common_1.BadRequestException(`Sitter is unavailable on ${this.toDayKey(unavailableDays.date)}`);
        }
        if (overlappingAccepted) {
            throw new common_1.BadRequestException('Sitter already has an accepted reservation in this range');
        }
    }
};
exports.ReservationsService = ReservationsService;
exports.ReservationsService = ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        messages_service_1.MessagesService])
], ReservationsService);
//# sourceMappingURL=reservations.service.js.map