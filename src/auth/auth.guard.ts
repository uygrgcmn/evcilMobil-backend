import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { UserRole } from '@prisma/client';
import { JWT_SECRET } from './auth.constants';
import type { AuthenticatedUser } from './auth.types';

type JwtPayload = {
  sub: string;
  email: string;
  role: UserRole;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{
      headers?: Record<string, string | string[] | undefined>;
      user?: AuthenticatedUser;
    }>();

    const header = request.headers?.authorization;
    const token = this.extractBearerToken(header);

    if (!token) {
      throw new UnauthorizedException('Missing bearer token');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: JWT_SECRET,
      });

      request.user = {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
      };

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractBearerToken(header?: string | string[]): string | null {
    const normalized = Array.isArray(header) ? header[0] : header;

    if (!normalized) {
      return null;
    }

    const [scheme, value] = normalized.split(' ');

    if (scheme?.toLowerCase() !== 'bearer' || !value) {
      return null;
    }

    return value;
  }
}
