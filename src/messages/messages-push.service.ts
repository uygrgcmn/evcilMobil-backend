import { Injectable, Logger } from '@nestjs/common';

type SendMessagePushInput = {
    expoPushToken: string;
    senderName: string;
    messageBody: string;
    threadId: string;
};

@Injectable()
export class MessagesPushService {
    private readonly logger = new Logger(MessagesPushService.name);
    private readonly expoPushApiUrl = 'https://exp.host/--/api/v2/push/send';

    async sendNewMessagePush(input: SendMessagePushInput) {
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

    private isExpoPushToken(token: string): boolean {
        return /^Expo(nent)?PushToken\[[^\]]+\]$/.test(token);
    }
}
