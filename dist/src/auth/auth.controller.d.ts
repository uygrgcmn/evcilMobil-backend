import { AuthService } from './auth.service';
import type { DeviceTokenInput, LoginInput, RegisterInput } from './auth.types';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: RegisterInput): Promise<import("./auth.types").AuthResponse>;
    login(body: LoginInput): Promise<import("./auth.types").AuthResponse>;
    me(userId: string): Promise<{
        id: string;
        ownerProfile: {
            id: string;
            fullName: string;
            city: string;
            district: string;
            avatarUrl: string;
        } | null;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        sitterProfile: {
            id: string;
            fullName: string;
            city: string;
            district: string;
            avatarUrl: string;
        } | null;
    }>;
    upsertDeviceToken(userId: string, body?: DeviceTokenInput): Promise<{
        ok: boolean;
    }>;
}
