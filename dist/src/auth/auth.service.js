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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const prisma_service_1 = require("../prisma/prisma.service");
const auth_constants_1 = require("./auth.constants");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(input) {
        const email = this.normalizeEmail(input.email);
        const password = this.validatePassword(input.password);
        const role = this.parseRole(input.role);
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
            select: { id: true },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Bu e-posta ile kayıtlı bir kullanıcı var.');
        }
        const passwordHash = await (0, bcryptjs_1.hash)(password, 10);
        const user = await this.prisma.user.create({
            data: {
                email,
                passwordHash,
                role,
            },
        });
        const fullName = (input.fullName ||
            email.split('@')[0] ||
            'Yeni Kullanici').trim();
        const city = (input.city || '').trim();
        const district = (input.district || '').trim();
        if (role === client_1.UserRole.OWNER) {
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
        }
        else {
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
    async login(input) {
        const email = this.normalizeEmail(input.email);
        if (!input.password || typeof input.password !== 'string') {
            throw new common_1.BadRequestException('Şifre zorunludur.');
        }
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('E-posta veya şifre hatalı.');
        }
        const isValid = await (0, bcryptjs_1.compare)(input.password, user.passwordHash);
        if (!isValid) {
            throw new common_1.UnauthorizedException('E-posta veya şifre hatalı.');
        }
        return this.buildAuthResponse(user);
    }
    async me(userId) {
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
            throw new common_1.NotFoundException('Kullanıcı bulunamadı.');
        }
        return user;
    }
    async upsertDeviceToken(userId, token) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true },
        });
        if (!user) {
            throw new common_1.NotFoundException('Kullanıcı bulunamadı.');
        }
        const normalizedToken = token?.trim() || null;
        if (normalizedToken && !this.isExpoPushToken(normalizedToken)) {
            throw new common_1.BadRequestException('Geçersiz Expo push token.');
        }
        await this.prisma.user.update({
            where: { id: userId },
            data: { expoPushToken: normalizedToken },
        });
        return { ok: true };
    }
    async buildAuthResponse(user) {
        const accessToken = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
            role: user.role,
        }, {
            secret: auth_constants_1.JWT_SECRET,
            expiresIn: auth_constants_1.JWT_EXPIRES_IN_SECONDS,
        });
        return {
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        };
    }
    normalizeEmail(email) {
        if (!email || typeof email !== 'string') {
            throw new common_1.BadRequestException('E-posta zorunludur.');
        }
        const normalized = email.trim().toLowerCase();
        if (!normalized || !normalized.includes('@')) {
            throw new common_1.BadRequestException('Geçerli bir e-posta girin.');
        }
        return normalized;
    }
    validatePassword(password) {
        if (!password || typeof password !== 'string') {
            throw new common_1.BadRequestException('Şifre zorunludur.');
        }
        if (password.length < 6) {
            throw new common_1.BadRequestException('Şifre en az 6 karakter olmalıdır.');
        }
        return password;
    }
    parseRole(role) {
        if (!role || typeof role !== 'string') {
            throw new common_1.BadRequestException('Rol zorunludur.');
        }
        const normalized = role.trim().toUpperCase();
        if (normalized === client_1.UserRole.OWNER) {
            return client_1.UserRole.OWNER;
        }
        if (normalized === client_1.UserRole.SITTER) {
            return client_1.UserRole.SITTER;
        }
        throw new common_1.BadRequestException('Rol OWNER veya SITTER olmalıdır.');
    }
    isExpoPushToken(token) {
        return /^Expo(nent)?PushToken\[[^\]]+\]$/.test(token);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map