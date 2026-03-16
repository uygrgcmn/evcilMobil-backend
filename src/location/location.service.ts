import { BadRequestException, Injectable } from '@nestjs/common';
import type { AuthenticatedUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';

type UpdateLocationInput = {
  latitude?: number | string;
  longitude?: number | string;
  accuracy?: number | string | null;
};

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async updateCurrentUserLocation(
    user: AuthenticatedUser,
    input: UpdateLocationInput,
  ) {
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

  async getCurrentUserLocation(user: AuthenticatedUser) {
    return this.prisma.activeLocation.findUnique({
      where: { userId: user.id },
    });
  }

  private parseLatitude(value: number | string | undefined): number {
    const latitude = this.toNumber(value, 'latitude');

    if (latitude < -90 || latitude > 90) {
      throw new BadRequestException('latitude must be between -90 and 90');
    }

    return latitude;
  }

  private parseLongitude(value: number | string | undefined): number {
    const longitude = this.toNumber(value, 'longitude');

    if (longitude < -180 || longitude > 180) {
      throw new BadRequestException('longitude must be between -180 and 180');
    }

    return longitude;
  }

  private parseAccuracy(
    value: number | string | null | undefined,
  ): number | null {
    if (value === undefined || value === null || value === '') {
      return null;
    }

    const accuracy = this.toNumber(value, 'accuracy');

    if (accuracy < 0) {
      throw new BadRequestException('accuracy must be a positive number');
    }

    return accuracy;
  }

  private toNumber(value: number | string | undefined, field: string): number {
    if (value === undefined || value === null || value === '') {
      throw new BadRequestException(`${field} is required`);
    }

    const parsed = typeof value === 'number' ? value : Number(value);

    if (!Number.isFinite(parsed)) {
      throw new BadRequestException(`${field} must be a valid number`);
    }

    return parsed;
  }
}
