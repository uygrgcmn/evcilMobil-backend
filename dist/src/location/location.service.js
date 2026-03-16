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
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LocationService = class LocationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async updateCurrentUserLocation(user, input) {
        const latitude = this.parseLatitude(input.latitude);
        const longitude = this.parseLongitude(input.longitude);
        const accuracy = this.parseAccuracy(input.accuracy);
        const now = new Date();
        return this.prisma.activeLocation.upsert({
            where: { userId: user.id },
            update: {
                latitude,
                longitude,
                accuracy,
                lastSharedAt: now,
            },
            create: {
                userId: user.id,
                latitude,
                longitude,
                accuracy,
                lastSharedAt: now,
            },
        });
    }
    async getCurrentUserLocation(user) {
        return this.prisma.activeLocation.findUnique({
            where: { userId: user.id },
        });
    }
    parseLatitude(value) {
        const latitude = this.toNumber(value, 'latitude');
        if (latitude < -90 || latitude > 90) {
            throw new common_1.BadRequestException('latitude must be between -90 and 90');
        }
        return latitude;
    }
    parseLongitude(value) {
        const longitude = this.toNumber(value, 'longitude');
        if (longitude < -180 || longitude > 180) {
            throw new common_1.BadRequestException('longitude must be between -180 and 180');
        }
        return longitude;
    }
    parseAccuracy(value) {
        if (value === undefined || value === null || value === '') {
            return null;
        }
        const accuracy = this.toNumber(value, 'accuracy');
        if (accuracy < 0) {
            throw new common_1.BadRequestException('accuracy must be a positive number');
        }
        return accuracy;
    }
    toNumber(value, field) {
        if (value === undefined || value === null || value === '') {
            throw new common_1.BadRequestException(`${field} is required`);
        }
        const parsed = typeof value === 'number' ? value : Number(value);
        if (!Number.isFinite(parsed)) {
            throw new common_1.BadRequestException(`${field} must be a valid number`);
        }
        return parsed;
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LocationService);
//# sourceMappingURL=location.service.js.map