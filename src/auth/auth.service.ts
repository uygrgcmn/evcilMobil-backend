import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole, type User } from '@prisma/client';
import { hash, compare } from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { JWT_EXPIRES_IN_SECONDS, JWT_SECRET } from './auth.constants';
import type { AuthResponse, LoginInput, RegisterInput } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  async register(input: RegisterInput): Promise<AuthResponse> {
    const email = this.normalizeEmail(input.email);
    const password = this.validatePassword(input.password);
    const role = this.parseRole(input.role);

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      throw new ConflictException('Bu e-posta ile kayıtlı bir kullanıcı var.');
    }

    const passwordHash = await hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        role,
      },
    });

    const fullName = (
      input.fullName ||
      email.split('@')[0] ||
      'Yeni Kullanici'
    ).trim();
    const city = (input.city || '').trim();
    const district = (input.district || '').trim();

    if (role === UserRole.OWNER) {
      await this.prisma.ownerProfile.create({
        data: {
          userId: user.id,
          fullName,
          roleLabel: 'Hayvan Sahibi',
          city,
          district,
          avatarUrl: '',
          about: '',
          averageRating: 0,
        },
      });
    } else {
      await this.prisma.sitter.create({
        data: {
          userId: user.id,
          fullName,
          city,
          district,
          about: '',
          yearsExperience: 0,
          identityVerified: false,
          repeatClientRate: 0,
          galleryImageUrls: [],
          rating: 0,
          reviewCount: 0,
          pricePerDay: 350,
          pricePerHour: 120,
          avatarUrl: '',
          isFeatured: false,
          tags: [],
        },
      });
    }

    return this.buildAuthResponse(user);
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const email = this.normalizeEmail(input.email);

    if (!input.password || typeof input.password !== 'string') {
      throw new BadRequestException('Şifre zorunludur.');
    }

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('E-posta veya şifre hatalı.');
    }

    const isValid = await compare(input.password, user.passwordHash);

    if (!isValid) {
      throw new UnauthorizedException('E-posta veya şifre hatalı.');
    }

    return this.buildAuthResponse(user);
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        ownerProfile: {
          select: {
            id: true,
            fullName: true,
            city: true,
            district: true,
            avatarUrl: true,
          },
        },
        sitterProfile: {
          select: {
            id: true,
            fullName: true,
            city: true,
            district: true,
            avatarUrl: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı.');
    }

    return user;
  }

  async upsertDeviceToken(userId: string, token: string | null) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı.');
    }

    const normalizedToken = token?.trim() || null;

    if (normalizedToken && !this.isExpoPushToken(normalizedToken)) {
      throw new BadRequestException('Geçersiz Expo push token.');
    }

    await (this.prisma as any).user.update({
      where: { id: userId },
      data: { expoPushToken: normalizedToken },
    });

    return { ok: true };
  }

  private async buildAuthResponse(
    user: Pick<User, 'id' | 'email' | 'role'>,
  ): Promise<AuthResponse> {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      {
        secret: JWT_SECRET,
        expiresIn: JWT_EXPIRES_IN_SECONDS,
      },
    );

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  private normalizeEmail(email: string | undefined): string {
    if (!email || typeof email !== 'string') {
      throw new BadRequestException('E-posta zorunludur.');
    }

    const normalized = email.trim().toLowerCase();

    if (!normalized || !normalized.includes('@')) {
      throw new BadRequestException('Geçerli bir e-posta girin.');
    }

    return normalized;
  }

  private validatePassword(password: string | undefined): string {
    if (!password || typeof password !== 'string') {
      throw new BadRequestException('Şifre zorunludur.');
    }

    if (password.length < 6) {
      throw new BadRequestException('Şifre en az 6 karakter olmalıdır.');
    }

    return password;
  }

  private parseRole(role: string | undefined): UserRole {
    if (!role || typeof role !== 'string') {
      throw new BadRequestException('Rol zorunludur.');
    }

    const normalized = role.trim().toUpperCase();

    if (normalized === UserRole.OWNER) {
      return UserRole.OWNER;
    }

    if (normalized === UserRole.SITTER) {
      return UserRole.SITTER;
    }

    throw new BadRequestException('Rol OWNER veya SITTER olmalıdır.');
  }

  private isExpoPushToken(token: string): boolean {
    return /^Expo(nent)?PushToken\[[^\]]+\]$/.test(token);
  }
}
