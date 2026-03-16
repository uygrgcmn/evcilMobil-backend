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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const messages_gateway_1 = require("./messages.gateway");
const messages_push_service_1 = require("./messages-push.service");
let MessagesService = class MessagesService {
    prisma;
    messagesGateway;
    messagesPushService;
    constructor(prisma, messagesGateway, messagesPushService) {
        this.prisma = prisma;
        this.messagesGateway = messagesGateway;
        this.messagesPushService = messagesPushService;
    }
    get prismaClient() {
        return this.prisma;
    }
    async list(user, search) {
        const threads = await this.prismaClient.messageThread.findMany({
            where: {
                OR: [{ ownerUserId: user.id }, { sitterUserId: user.id }],
            },
            include: {
                ownerUser: {
                    select: {
                        id: true,
                        role: true,
                        email: true,
                        activeLocation: { select: { lastSharedAt: true } },
                        ownerProfile: { select: { fullName: true, avatarUrl: true } },
                        sitterProfile: { select: { fullName: true, avatarUrl: true } },
                    },
                },
                sitterUser: {
                    select: {
                        id: true,
                        role: true,
                        email: true,
                        activeLocation: { select: { lastSharedAt: true } },
                        ownerProfile: { select: { fullName: true, avatarUrl: true } },
                        sitterProfile: { select: { fullName: true, avatarUrl: true } },
                    },
                },
                messages: {
                    select: {
                        id: true,
                        body: true,
                        createdAt: true,
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                },
            },
            orderBy: [{ lastMessageAt: 'desc' }, { updatedAt: 'desc' }],
        });
        const normalizedSearch = search?.trim().toLowerCase();
        return threads
            .map((thread) => this.mapThreadSummary(thread, user.id))
            .filter((thread) => {
            if (!normalizedSearch) {
                return true;
            }
            return (thread.senderName.toLowerCase().includes(normalizedSearch) ||
                thread.previewText.toLowerCase().includes(normalizedSearch));
        });
    }
    async startConversation(user, input) {
        const listingId = this.optionalTrim(input.listingId);
        const initialMessage = this.optionalTrim(input.initialMessage);
        const requestedSitterId = this.optionalTrim(input.sitterId);
        const explicitOwnerId = this.optionalTrim(input.ownerId);
        let ownerUserId;
        let sitterUserId;
        if (listingId) {
            const listing = await this.prismaClient.listing.findUnique({
                where: { id: listingId },
                select: {
                    id: true,
                    listingType: true,
                    publishedByUserId: true,
                    sitterId: true,
                    sitter: {
                        select: { userId: true },
                    },
                },
            });
            if (!listing) {
                throw new common_1.NotFoundException('Listing not found');
            }
            if (listing.listingType === client_1.ListingType.OWNER_REQUEST) {
                ownerUserId = listing.publishedByUserId;
                if (user.id === ownerUserId) {
                    const resolvedSitterUserId = await this.resolveSitterUserIdFromInput(requestedSitterId);
                    if (!resolvedSitterUserId) {
                        throw new common_1.BadRequestException('sitterId is required for owner-request conversations');
                    }
                    sitterUserId = resolvedSitterUserId;
                }
                else {
                    sitterUserId = user.id;
                }
            }
            else {
                const listingSitterUserId = listing.sitter?.userId || listing.publishedByUserId;
                sitterUserId = listingSitterUserId;
                if (user.id === sitterUserId) {
                    ownerUserId = explicitOwnerId;
                    if (!ownerUserId) {
                        throw new common_1.BadRequestException('ownerId is required for sitter-service conversations');
                    }
                }
                else {
                    ownerUserId = user.id;
                }
            }
        }
        else {
            const resolvedSitterUserId = await this.resolveSitterUserIdFromInput(requestedSitterId);
            if (resolvedSitterUserId && explicitOwnerId) {
                ownerUserId = explicitOwnerId;
                sitterUserId = resolvedSitterUserId;
            }
            else if (resolvedSitterUserId) {
                ownerUserId = user.id;
                sitterUserId = resolvedSitterUserId;
            }
            else if (explicitOwnerId) {
                ownerUserId = explicitOwnerId;
                sitterUserId = user.id;
            }
            else {
                throw new common_1.BadRequestException('listingId, sitterId or ownerId is required');
            }
        }
        if (!ownerUserId || !sitterUserId) {
            throw new common_1.BadRequestException('Conversation participants could not be resolved');
        }
        if (ownerUserId === sitterUserId) {
            throw new common_1.BadRequestException('Conversation participants must be different users');
        }
        const [ownerUser, sitterUser] = await Promise.all([
            this.prismaClient.user.findUnique({
                where: { id: ownerUserId },
                select: { id: true },
            }),
            this.prismaClient.user.findUnique({
                where: { id: sitterUserId },
                select: { id: true },
            }),
        ]);
        if (!ownerUser) {
            throw new common_1.NotFoundException('Owner user not found');
        }
        if (!sitterUser) {
            throw new common_1.NotFoundException('Sitter user not found');
        }
        if (listingId) {
            await this.assertListingConversationContext({
                listingId,
                ownerUserId,
                sitterUserId,
                requestedSitterId,
            });
        }
        const existingThread = await this.prismaClient.messageThread.findFirst({
            where: {
                ownerUserId,
                sitterUserId,
                listingId: listingId ?? undefined,
            },
            orderBy: { lastMessageAt: 'desc' },
        });
        let threadId = existingThread?.id;
        if (!threadId) {
            const counterpart = await this.prismaClient.user.findUnique({
                where: { id: user.id === ownerUserId ? sitterUserId : ownerUserId },
                select: {
                    email: true,
                    ownerProfile: { select: { fullName: true, avatarUrl: true } },
                    sitterProfile: { select: { fullName: true, avatarUrl: true } },
                },
            });
            const createdThread = await this.prismaClient.messageThread.create({
                data: {
                    ownerUserId,
                    sitterUserId,
                    listingId,
                    senderName: this.getUserDisplayName(counterpart),
                    avatarUrl: this.getUserAvatar(counterpart),
                    previewText: '',
                    timeLabel: 'Simdi',
                    unreadCount: 0,
                    isOnline: false,
                    isPriority: false,
                },
            });
            threadId = createdThread.id;
        }
        if (initialMessage) {
            await this.sendMessage(user, threadId, initialMessage);
        }
        return { threadId };
    }
    async findOne(user, id) {
        const thread = await this.prismaClient.messageThread.findFirst({
            where: {
                id,
                OR: [{ ownerUserId: user.id }, { sitterUserId: user.id }],
            },
            include: {
                ownerUser: {
                    select: {
                        id: true,
                        role: true,
                        email: true,
                        activeLocation: { select: { lastSharedAt: true } },
                        ownerProfile: { select: { fullName: true, avatarUrl: true } },
                        sitterProfile: { select: { fullName: true, avatarUrl: true } },
                    },
                },
                sitterUser: {
                    select: {
                        id: true,
                        role: true,
                        email: true,
                        activeLocation: { select: { lastSharedAt: true } },
                        ownerProfile: { select: { fullName: true, avatarUrl: true } },
                        sitterProfile: { select: { fullName: true, avatarUrl: true } },
                    },
                },
                messages: {
                    select: {
                        id: true,
                        senderUserId: true,
                        body: true,
                        createdAt: true,
                    },
                    orderBy: { createdAt: 'asc' },
                },
                listing: {
                    select: {
                        id: true,
                        title: true,
                        listingType: true,
                        city: true,
                        district: true,
                        isActive: true,
                    },
                },
            },
        });
        if (!thread) {
            throw new common_1.NotFoundException('Message thread not found');
        }
        await this.markAsRead(thread.id, user.id, thread.ownerUserId, thread.sitterUserId, thread.ownerUnreadCount, thread.sitterUnreadCount);
        const counterpart = this.resolveCounterpart(thread, user.id);
        const participantIds = [thread.ownerUserId, thread.sitterUserId].filter((participantId) => Boolean(participantId));
        const latestReservation = thread.listingId
            ? await this.prismaClient.listingApplication.findFirst({
                where: {
                    listingId: thread.listingId,
                    applicantId: {
                        in: participantIds,
                    },
                },
                orderBy: [{ createdAt: 'desc' }],
                select: {
                    id: true,
                    status: true,
                    startDate: true,
                    endDate: true,
                    applicantId: true,
                    createdAt: true,
                    updatedAt: true,
                },
            })
            : null;
        return {
            id: thread.id,
            counterpart: {
                id: counterpart?.id ?? '',
                fullName: this.getUserDisplayName(counterpart),
                avatarUrl: this.getUserAvatar(counterpart),
                role: counterpart?.role ?? null,
                isOnline: this.isUserOnline(counterpart),
            },
            unreadCount: 0,
            lastMessageAt: thread.lastMessageAt,
            messages: thread.messages.map((message) => ({
                id: message.id,
                senderUserId: message.senderUserId,
                body: message.body,
                createdAt: message.createdAt,
                isMine: message.senderUserId === user.id,
            })),
            reservationContext: thread.listing
                ? {
                    listingId: thread.listing.id,
                    listingTitle: thread.listing.title,
                    listingType: thread.listing.listingType,
                    city: thread.listing.city,
                    district: thread.listing.district,
                    listingIsActive: thread.listing.isActive,
                    latestReservation: latestReservation
                        ? {
                            id: latestReservation.id,
                            status: latestReservation.status,
                            startDate: latestReservation.startDate,
                            endDate: latestReservation.endDate,
                            applicantId: latestReservation.applicantId,
                            createdAt: latestReservation.createdAt,
                            updatedAt: latestReservation.updatedAt,
                        }
                        : null,
                    steps: [
                        '1) Tarih araligini sec ve rezervasyon teklifini gonder.',
                        '2) Ilan sahibi teklifi kabul veya reddet olarak yanitlar.',
                    ],
                }
                : null,
        };
    }
    async sendMessage(user, threadId, rawMessage) {
        const message = this.validateMessage(rawMessage);
        const thread = await this.prismaClient.messageThread.findFirst({
            where: {
                id: threadId,
                OR: [{ ownerUserId: user.id }, { sitterUserId: user.id }],
            },
            include: {
                ownerUser: {
                    select: {
                        id: true,
                        email: true,
                        expoPushToken: true,
                        ownerProfile: { select: { fullName: true, avatarUrl: true } },
                        sitterProfile: { select: { fullName: true, avatarUrl: true } },
                    },
                },
                sitterUser: {
                    select: {
                        id: true,
                        email: true,
                        expoPushToken: true,
                        ownerProfile: { select: { fullName: true, avatarUrl: true } },
                        sitterProfile: { select: { fullName: true, avatarUrl: true } },
                    },
                },
            },
        });
        if (!thread) {
            throw new common_1.NotFoundException('Message thread not found');
        }
        const isOwnerSender = thread.ownerUserId === user.id;
        const createdMessage = await this.prismaClient.message.create({
            data: {
                threadId: thread.id,
                senderUserId: user.id,
                body: message,
            },
        });
        const nextOwnerUnread = isOwnerSender ? 0 : thread.ownerUnreadCount + 1;
        const nextSitterUnread = isOwnerSender ? thread.sitterUnreadCount + 1 : 0;
        const senderProfile = isOwnerSender ? thread.ownerUser : thread.sitterUser;
        const recipientProfile = isOwnerSender ? thread.sitterUser : thread.ownerUser;
        const recipientUserId = isOwnerSender ? thread.sitterUserId : thread.ownerUserId;
        await this.prismaClient.messageThread.update({
            where: { id: thread.id },
            data: {
                previewText: message,
                timeLabel: this.formatTimeLabel(createdMessage.createdAt),
                senderName: this.getUserDisplayName(senderProfile),
                avatarUrl: this.getUserAvatar(senderProfile),
                unreadCount: isOwnerSender ? nextSitterUnread : nextOwnerUnread,
                ownerUnreadCount: nextOwnerUnread,
                sitterUnreadCount: nextSitterUnread,
                isPriority: true,
                lastMessageAt: createdMessage.createdAt,
            },
        });
        const realtimeThread = await this.getThreadForRealtime(thread.id);
        if (realtimeThread) {
            this.emitMessageEventsToParticipants(realtimeThread, createdMessage);
            this.emitThreadEventsToParticipants(realtimeThread, {
                threadId: thread.id,
                actorUserId: user.id,
                senderUserId: user.id,
                lastMessageAt: createdMessage.createdAt.toISOString(),
            });
        }
        const recipientPushToken = recipientProfile?.expoPushToken?.trim() ?? '';
        if (recipientUserId && recipientPushToken && !this.messagesGateway.isUserOnline(recipientUserId)) {
            await this.messagesPushService.sendNewMessagePush({
                expoPushToken: recipientPushToken,
                senderName: this.getUserDisplayName(senderProfile),
                messageBody: createdMessage.body,
                threadId: thread.id,
            });
        }
        return {
            id: createdMessage.id,
            threadId: thread.id,
            senderUserId: createdMessage.senderUserId,
            body: createdMessage.body,
            createdAt: createdMessage.createdAt,
            isMine: true,
        };
    }
    async markAsRead(threadId, userId, ownerUserId, sitterUserId, ownerUnreadCount, sitterUnreadCount) {
        if (ownerUserId === userId && ownerUnreadCount > 0) {
            await this.prismaClient.messageThread.update({
                where: { id: threadId },
                data: {
                    ownerUnreadCount: 0,
                    unreadCount: sitterUnreadCount,
                    isPriority: sitterUnreadCount > 0,
                },
            });
            const realtimeThread = await this.getThreadForRealtime(threadId);
            if (realtimeThread) {
                this.emitThreadEventsToParticipants(realtimeThread, {
                    threadId,
                    actorUserId: userId,
                });
            }
            return;
        }
        if (sitterUserId === userId && sitterUnreadCount > 0) {
            await this.prismaClient.messageThread.update({
                where: { id: threadId },
                data: {
                    sitterUnreadCount: 0,
                    unreadCount: ownerUnreadCount,
                    isPriority: ownerUnreadCount > 0,
                },
            });
            const realtimeThread = await this.getThreadForRealtime(threadId);
            if (realtimeThread) {
                this.emitThreadEventsToParticipants(realtimeThread, {
                    threadId,
                    actorUserId: userId,
                });
            }
        }
    }
    emitMessageEventsToParticipants(thread, message) {
        const participantIds = [thread.ownerUserId, thread.sitterUserId]
            .filter((userId) => Boolean(userId));
        for (const userId of new Set(participantIds)) {
            this.messagesGateway.emitMessageCreated(userId, {
                threadId: thread.id,
                messageId: message.id,
                senderUserId: message.senderUserId,
                createdAt: this.toIsoString(message.createdAt),
                message: this.mapRealtimeMessage(message, userId),
                thread: this.mapThreadSummary(thread, userId),
            });
        }
    }
    emitThreadEventsToParticipants(thread, payload) {
        const participantIds = [thread.ownerUserId, thread.sitterUserId]
            .filter((userId) => Boolean(userId));
        for (const userId of new Set(participantIds)) {
            this.messagesGateway.emitThreadUpdated(userId, {
                ...payload,
                thread: this.mapThreadSummary(thread, userId),
            });
        }
    }
    async getThreadForRealtime(threadId) {
        return this.prismaClient.messageThread.findUnique({
            where: { id: threadId },
            include: {
                ownerUser: {
                    select: {
                        id: true,
                        role: true,
                        email: true,
                        activeLocation: { select: { lastSharedAt: true } },
                        ownerProfile: { select: { fullName: true, avatarUrl: true } },
                        sitterProfile: { select: { fullName: true, avatarUrl: true } },
                    },
                },
                sitterUser: {
                    select: {
                        id: true,
                        role: true,
                        email: true,
                        activeLocation: { select: { lastSharedAt: true } },
                        ownerProfile: { select: { fullName: true, avatarUrl: true } },
                        sitterProfile: { select: { fullName: true, avatarUrl: true } },
                    },
                },
                messages: {
                    select: {
                        id: true,
                        senderUserId: true,
                        body: true,
                        createdAt: true,
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                },
            },
        });
    }
    mapRealtimeMessage(message, currentUserId) {
        return {
            id: message.id,
            senderUserId: message.senderUserId,
            body: message.body,
            createdAt: this.toIsoString(message.createdAt),
            isMine: message.senderUserId === currentUserId,
        };
    }
    mapThreadSummary(thread, currentUserId) {
        const counterpart = this.resolveCounterpart(thread, currentUserId);
        const unreadCount = thread.ownerUserId === currentUserId
            ? thread.ownerUnreadCount
            : thread.sitterUserId === currentUserId
                ? thread.sitterUnreadCount
                : thread.unreadCount;
        const latestMessage = thread.messages?.[0];
        const previewText = thread.previewText || latestMessage?.body || 'Yeni sohbet';
        const messageTime = latestMessage?.createdAt ?? thread.lastMessageAt ?? new Date();
        return {
            id: thread.id,
            senderName: this.getUserDisplayName(counterpart) || thread.senderName || 'Sohbet',
            avatarUrl: this.getUserAvatar(counterpart) || thread.avatarUrl,
            previewText,
            timeLabel: this.formatTimeLabel(this.toDate(messageTime)),
            unreadCount,
            isOnline: counterpart ? this.isUserOnline(counterpart) : Boolean(thread.isOnline),
            isPriority: unreadCount > 0 || Boolean(thread.isPriority),
        };
    }
    toIsoString(value) {
        return typeof value === 'string' ? value : value.toISOString();
    }
    toDate(value) {
        return value instanceof Date ? value : new Date(value);
    }
    resolveCounterpart(thread, currentUserId) {
        if (thread.ownerUserId === currentUserId) {
            return thread.sitterUser;
        }
        if (thread.sitterUserId === currentUserId) {
            return thread.ownerUser;
        }
        return null;
    }
    getUserDisplayName(user) {
        if (!user) {
            return '';
        }
        return (user.ownerProfile?.fullName ||
            user.sitterProfile?.fullName ||
            user.email?.split('@')?.[0] ||
            'Kullanici');
    }
    getUserAvatar(user) {
        if (!user) {
            return '';
        }
        return user.ownerProfile?.avatarUrl || user.sitterProfile?.avatarUrl || '';
    }
    isUserOnline(user) {
        const lastSharedAt = user?.activeLocation?.lastSharedAt;
        if (!lastSharedAt) {
            return false;
        }
        const fiveMinutesMs = 5 * 60 * 1000;
        return Date.now() - new Date(lastSharedAt).getTime() <= fiveMinutesMs;
    }
    formatTimeLabel(date) {
        const now = Date.now();
        const diffMs = now - new Date(date).getTime();
        if (diffMs < 60_000) {
            return 'Simdi';
        }
        if (diffMs < 3_600_000) {
            return `${Math.max(1, Math.floor(diffMs / 60_000))} dk`;
        }
        if (diffMs < 86_400_000) {
            return `${Math.max(1, Math.floor(diffMs / 3_600_000))} sa`;
        }
        const value = new Date(date);
        const day = String(value.getDate()).padStart(2, '0');
        const month = String(value.getMonth() + 1).padStart(2, '0');
        return `${day}.${month}`;
    }
    validateMessage(rawMessage) {
        const message = rawMessage?.trim();
        if (!message) {
            throw new common_1.BadRequestException('Message is required');
        }
        if (message.length > 2000) {
            throw new common_1.BadRequestException('Message is too long');
        }
        return message;
    }
    async assertListingConversationContext(input) {
        const listing = await this.prismaClient.listing.findUnique({
            where: { id: input.listingId },
            select: {
                id: true,
                listingType: true,
                publishedByUserId: true,
                sitterId: true,
                sitter: {
                    select: { userId: true },
                },
            },
        });
        if (!listing) {
            throw new common_1.NotFoundException('Listing not found');
        }
        if (listing.listingType === client_1.ListingType.OWNER_REQUEST) {
            if (listing.publishedByUserId !== input.ownerUserId) {
                throw new common_1.BadRequestException('listingId is not compatible with selected participants');
            }
            if (input.requestedSitterId &&
                listing.sitterId &&
                listing.sitterId !== input.requestedSitterId) {
                throw new common_1.BadRequestException('listingId is not compatible with selected participants');
            }
            return;
        }
        const listingSitterUserId = listing.sitter?.userId || listing.publishedByUserId;
        if (listingSitterUserId !== input.sitterUserId) {
            throw new common_1.BadRequestException('listingId is not compatible with selected participants');
        }
    }
    async resolveSitterUserIdFromInput(sitterId) {
        if (!sitterId) {
            return undefined;
        }
        const sitter = await this.prismaClient.sitter.findUnique({
            where: { id: sitterId },
            select: { userId: true },
        });
        if (!sitter?.userId) {
            throw new common_1.NotFoundException('Sitter not found');
        }
        return sitter.userId;
    }
    optionalTrim(value) {
        const trimmed = value?.trim();
        return trimmed ? trimmed : undefined;
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        messages_gateway_1.MessagesGateway,
        messages_push_service_1.MessagesPushService])
], MessagesService);
//# sourceMappingURL=messages.service.js.map