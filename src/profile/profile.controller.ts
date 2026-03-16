import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@CurrentUser('id') userId: string) {
    return this.profileService.getMe(userId);
  }

  @UseGuards(AuthGuard)
  @Patch('me')
  async updateMe(
    @CurrentUser('id') userId: string,
    @Body()
    body: {
      fullName?: string;
      city?: string;
      district?: string;
      about?: string;
      yearsExperience?: number;
      tags?: string[];
      pricePerDay?: number;
      pricePerHour?: number;
    } = {},
  ) {
    return this.profileService.updateMyProfile(userId, body);
  }

  @UseGuards(AuthGuard)
  @Patch('me/avatar')
  async updateMyAvatar(
    @CurrentUser('id') userId: string,
    @Body() body: { avatarUrl?: string | null } = {},
  ) {
    if (!Object.prototype.hasOwnProperty.call(body, 'avatarUrl')) {
      throw new BadRequestException('avatarUrl field is required');
    }

    const { avatarUrl } = body;

    if (avatarUrl !== null && typeof avatarUrl !== 'string') {
      throw new BadRequestException('avatarUrl must be string or null');
    }

    return this.profileService.updateMyAvatar(userId, avatarUrl);
  }

  @UseGuards(AuthGuard)
  @Post('me/pets')
  async addPet(
    @CurrentUser('id') userId: string,
    @Body() body: { name?: string; breed?: string; photoUrl?: string } = {},
  ) {
    return this.profileService.addPet(userId, body);
  }

  @UseGuards(AuthGuard)
  @Delete('me/pets/:petId')
  async removePet(
    @CurrentUser('id') userId: string,
    @Param('petId') petId: string,
  ) {
    await this.profileService.removePet(userId, petId);
    return { ok: true };
  }
}

