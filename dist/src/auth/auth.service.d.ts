import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import type { AuthResponse, LoginInput, RegisterInput } from './auth.types';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(input: RegisterInput): Promise<AuthResponse>;
    login(input: LoginInput): Promise<AuthResponse>;
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
    upsertDeviceToken(userId: string, token: string | null): Promise<{
        ok: boolean;
    }>;
    private buildAuthResponse;
    private normalizeEmail;
    private validatePassword;
    private parseRole;
    private ensureUserProfiles;
    private isExpoPushToken;
}
