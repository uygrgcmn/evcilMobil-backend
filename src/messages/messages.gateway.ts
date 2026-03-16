import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import type { UserRole } from '@prisma/client';
import type { Server, Socket } from 'socket.io';
import { JWT_SECRET } from '../auth/auth.constants';

type SocketJwtPayload = {
    sub: string;
    email: string;
    role: UserRole;
};

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

@WebSocketGateway({
    namespace: '/messages',
    cors: {
        origin: true,
    },
})
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    private server!: Server;

    private readonly logger = new Logger(MessagesGateway.name);
    private readonly activeSocketIdsByUserId = new Map<string, Set<string>>();

    constructor(private readonly jwtService: JwtService) { }

    async handleConnection(client: Socket) {
        const token = this.extractBearerToken(client);

        if (!token) {
            client.disconnect(true);
            return;
        }

        try {
            const payload = await this.jwtService.verifyAsync<SocketJwtPayload>(token, {
                secret: JWT_SECRET,
            });

            const userId = payload.sub;
            if (!userId) {
                client.disconnect(true);
                return;
            }

            client.data.userId = userId;
            client.join(this.userRoom(userId));

            const current = this.activeSocketIdsByUserId.get(userId) ?? new Set<string>();
            current.add(client.id);
            this.activeSocketIdsByUserId.set(userId, current);
        } catch {
            this.logger.warn(`Rejected socket connection: ${client.id}`);
            client.disconnect(true);
        }
    }

    handleDisconnect(client: Socket) {
        const userId = this.resolveUserId(client);
        if (!userId) {
            return;
        }

        const sockets = this.activeSocketIdsByUserId.get(userId);
        if (!sockets) {
            return;
        }

        sockets.delete(client.id);

        if (sockets.size === 0) {
            this.activeSocketIdsByUserId.delete(userId);
            return;
        }

        this.activeSocketIdsByUserId.set(userId, sockets);
    }

    @SubscribeMessage('thread:join')
    joinThread(
        @ConnectedSocket() client: Socket,
        @MessageBody() body: { threadId?: string } = {},
    ) {
        const threadId = body.threadId?.trim();

        if (!threadId) {
            return;
        }

        client.join(this.threadRoom(threadId));
    }

    @SubscribeMessage('thread:leave')
    leaveThread(
        @ConnectedSocket() client: Socket,
        @MessageBody() body: { threadId?: string } = {},
    ) {
        const threadId = body.threadId?.trim();

        if (!threadId) {
            return;
        }

        client.leave(this.threadRoom(threadId));
    }

    emitThreadUpdated(userId: string, payload: SocketThreadPayload) {
        this.server.to(this.userRoom(userId)).emit('thread:updated', payload);
    }

    emitMessageCreated(userId: string, payload: SocketMessagePayload) {
        this.server.to(this.userRoom(userId)).emit('message:new', payload);
    }

    isUserOnline(userId: string): boolean {
        return (this.activeSocketIdsByUserId.get(userId)?.size ?? 0) > 0;
    }

    private resolveUserId(client: Socket): string | null {
        const userId = client.data?.userId;

        if (typeof userId !== 'string') {
            return null;
        }

        const normalized = userId.trim();
        return normalized ? normalized : null;
    }

    private extractBearerToken(client: Socket): string | null {
        const authToken = client.handshake.auth?.token;

        if (typeof authToken === 'string' && authToken.trim()) {
            return authToken.trim();
        }

        const authorization = client.handshake.headers?.authorization;
        if (typeof authorization !== 'string') {
            return null;
        }

        const [scheme, token] = authorization.split(' ');

        if (scheme?.toLowerCase() !== 'bearer' || !token?.trim()) {
            return null;
        }

        return token.trim();
    }

    private userRoom(userId: string) {
        return `user:${userId}`;
    }

    private threadRoom(threadId: string) {
        return `thread:${threadId}`;
    }
}
