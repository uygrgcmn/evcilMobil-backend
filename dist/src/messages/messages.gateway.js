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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MessagesGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesGateway = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const websockets_1 = require("@nestjs/websockets");
const auth_constants_1 = require("../auth/auth.constants");
let MessagesGateway = MessagesGateway_1 = class MessagesGateway {
    jwtService;
    server;
    logger = new common_1.Logger(MessagesGateway_1.name);
    activeSocketIdsByUserId = new Map();
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async handleConnection(client) {
        const token = this.extractBearerToken(client);
        if (!token) {
            client.disconnect(true);
            return;
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.JWT_SECRET,
            });
            const userId = payload.sub;
            if (!userId) {
                client.disconnect(true);
                return;
            }
            client.data.userId = userId;
            client.join(this.userRoom(userId));
            const current = this.activeSocketIdsByUserId.get(userId) ?? new Set();
            current.add(client.id);
            this.activeSocketIdsByUserId.set(userId, current);
        }
        catch {
            this.logger.warn(`Rejected socket connection: ${client.id}`);
            client.disconnect(true);
        }
    }
    handleDisconnect(client) {
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
    joinThread(client, body = {}) {
        const threadId = body.threadId?.trim();
        if (!threadId) {
            return;
        }
        client.join(this.threadRoom(threadId));
    }
    leaveThread(client, body = {}) {
        const threadId = body.threadId?.trim();
        if (!threadId) {
            return;
        }
        client.leave(this.threadRoom(threadId));
    }
    emitThreadUpdated(userId, payload) {
        this.server.to(this.userRoom(userId)).emit('thread:updated', payload);
    }
    emitMessageCreated(userId, payload) {
        this.server.to(this.userRoom(userId)).emit('message:new', payload);
    }
    isUserOnline(userId) {
        return (this.activeSocketIdsByUserId.get(userId)?.size ?? 0) > 0;
    }
    resolveUserId(client) {
        const userId = client.data?.userId;
        if (typeof userId !== 'string') {
            return null;
        }
        const normalized = userId.trim();
        return normalized ? normalized : null;
    }
    extractBearerToken(client) {
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
    userRoom(userId) {
        return `user:${userId}`;
    }
    threadRoom(threadId) {
        return `thread:${threadId}`;
    }
};
exports.MessagesGateway = MessagesGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Function)
], MessagesGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('thread:join'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", void 0)
], MessagesGateway.prototype, "joinThread", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('thread:leave'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", void 0)
], MessagesGateway.prototype, "leaveThread", null);
exports.MessagesGateway = MessagesGateway = MessagesGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: '/messages',
        cors: {
            origin: true,
        },
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], MessagesGateway);
//# sourceMappingURL=messages.gateway.js.map