import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import type { Socket } from 'socket.io';
type SocketThreadPayload = {
    threadId: string;
    actorUserId?: string;
    senderUserId?: string;
    lastMessageAt?: string;
    thread?: {
        id: string;
        senderName: string;
        avatarUrl: string;
        previewText: string;
        timeLabel: string;
        unreadCount: number;
        isOnline: boolean;
        isPriority: boolean;
    };
};
type SocketMessagePayload = {
    threadId: string;
    messageId: string;
    senderUserId: string;
    createdAt: string;
    message?: {
        id: string;
        senderUserId: string;
        body: string;
        createdAt: string;
        isMine: boolean;
    };
    thread?: {
        id: string;
        senderName: string;
        avatarUrl: string;
        previewText: string;
        timeLabel: string;
        unreadCount: number;
        isOnline: boolean;
        isPriority: boolean;
    };
};
export declare class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly jwtService;
    private server;
    private readonly logger;
    private readonly activeSocketIdsByUserId;
    constructor(jwtService: JwtService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    joinThread(client: Socket, body?: {
        threadId?: string;
    }): void;
    leaveThread(client: Socket, body?: {
        threadId?: string;
    }): void;
    emitThreadUpdated(userId: string, payload: SocketThreadPayload): void;
    emitMessageCreated(userId: string, payload: SocketMessagePayload): void;
    isUserOnline(userId: string): boolean;
    private resolveUserId;
    private extractBearerToken;
    private userRoom;
    private threadRoom;
}
export {};
