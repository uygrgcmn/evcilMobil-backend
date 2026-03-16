import type { AuthenticatedUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
import { MessagesGateway } from './messages.gateway';
import { MessagesPushService } from './messages-push.service';
export declare class MessagesService {
    private readonly prisma;
    private readonly messagesGateway;
    private readonly messagesPushService;
    constructor(prisma: PrismaService, messagesGateway: MessagesGateway, messagesPushService: MessagesPushService);
    private get prismaClient();
    list(user: AuthenticatedUser, search?: string): Promise<any>;
    startConversation(user: AuthenticatedUser, input: {
        sitterId?: string;
        ownerId?: string;
        listingId?: string;
        initialMessage?: string;
    }): Promise<{
        threadId: any;
    }>;
    findOne(user: AuthenticatedUser, id: string): Promise<{
        id: any;
        counterpart: {
            id: any;
            fullName: any;
            avatarUrl: any;
            role: any;
            isOnline: boolean;
        };
        unreadCount: number;
        lastMessageAt: any;
        messages: any;
        reservationContext: {
            listingId: any;
            listingTitle: any;
            listingType: any;
            city: any;
            district: any;
            listingIsActive: any;
            latestReservation: {
                id: any;
                status: any;
                startDate: any;
                endDate: any;
                applicantId: any;
                createdAt: any;
                updatedAt: any;
            } | null;
            steps: string[];
        } | null;
    }>;
    sendMessage(user: AuthenticatedUser, threadId: string, rawMessage?: string): Promise<{
        id: any;
        threadId: any;
        senderUserId: any;
        body: any;
        createdAt: any;
        isMine: boolean;
    }>;
    private markAsRead;
    private emitMessageEventsToParticipants;
    private emitThreadEventsToParticipants;
    private getThreadForRealtime;
    private mapRealtimeMessage;
    private mapThreadSummary;
    private toIsoString;
    private toDate;
    private resolveCounterpart;
    private getUserDisplayName;
    private getUserAvatar;
    private isUserOnline;
    private formatTimeLabel;
    private validateMessage;
    private assertListingConversationContext;
    private resolveSitterUserIdFromInput;
    private optionalTrim;
}
