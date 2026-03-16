import type { AuthenticatedUser } from '../auth/auth.types';
import { MessagesService } from './messages.service';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    list(user: AuthenticatedUser, search?: string): Promise<any>;
    start(user: AuthenticatedUser, body: {
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
    }>;
    sendMessage(user: AuthenticatedUser, id: string, body: {
        message?: string;
    }): Promise<{
        id: any;
        threadId: any;
        senderUserId: any;
        body: any;
        createdAt: any;
        isMine: boolean;
    }>;
}
