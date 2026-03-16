import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import type { AuthenticatedUser } from '../auth/auth.types';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { LocationService } from './location.service';

@Controller('location')
@UseGuards(AuthGuard)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('update')
  async update(
    @CurrentUser() user: AuthenticatedUser,
    @Body()
    body: {
      latitude?: number | string;
      longitude?: number | string;
      accuracy?: number | string | null;
    },
  ) {
    return this.locationService.updateCurrentUserLocation(user, body);
  }

  @Get('me')
  async myLocation(@CurrentUser() user: AuthenticatedUser) {
    return this.locationService.getCurrentUserLocation(user);
  }
}
