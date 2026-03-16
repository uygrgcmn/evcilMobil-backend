"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MessagesPushService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesPushService = void 0;
const common_1 = require("@nestjs/common");
let MessagesPushService = MessagesPushService_1 = class MessagesPushService {
    logger = new common_1.Logger(MessagesPushService_1.name);
    expoPushApiUrl = 'https://exp.host/--/api/v2/push/send';
    async sendNewMessagePush(input) {
        const token = input.expoPushToken.trim();
        if (!this.isExpoPushToken(token)) {
            return;
        }
        const response = await fetch(this.expoPushApiUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-Encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: token,
                sound: 'default',
                title: input.senderName || 'Yeni mesaj',
                body: input.messageBody,
                data: {
                    type: 'message',
                    threadId: input.threadId,
                },
            }),
        }).catch((error) => {
            this.logger.warn(`Expo push request failed: ${String(error)}`);
            return null;
        });
        if (!response) {
            return;
        }
        if (!response.ok) {
            const errorBody = await response.text().catch(() => '');
            this.logger.warn(`Expo push API error ${response.status}: ${errorBody}`);
        }
    }
    isExpoPushToken(token) {
        return /^Expo(nent)?PushToken\[[^\]]+\]$/.test(token);
    }
};
exports.MessagesPushService = MessagesPushService;
exports.MessagesPushService = MessagesPushService = MessagesPushService_1 = __decorate([
    (0, common_1.Injectable)()
], MessagesPushService);
//# sourceMappingURL=messages-push.service.js.map