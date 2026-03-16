type SendMessagePushInput = {
    expoPushToken: string;
    senderName: string;
    messageBody: string;
    threadId: string;
};
export declare class MessagesPushService {
    private readonly logger;
    private readonly expoPushApiUrl;
    sendNewMessagePush(input: SendMessagePushInput): Promise<void>;
    private isExpoPushToken;
}
export {};
