import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { AuthenticatedUser } from '../auth/auth.types';
import { CommunityService } from './community.service';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  private parseBoolean(value?: string): boolean {
    return value?.trim().toLowerCase() === 'true';
  }

  @Get()
  async list(
    @Query('category') category?: string,
    @Query('city') city?: string,
    @Query('district') district?: string,
    @Query('publisherType') publisherType?: string,
    @Query('includeClosed') includeClosed?: string,
  ) {
    return this.communityService.getFeed({
      category,
      city,
      district,
      publisherType,
      includeClosed: this.parseBoolean(includeClosed),
    });
  }

  @UseGuards(AuthGuard)
  @Get('mine')
  async mine(@CurrentUser() user: AuthenticatedUser) {
    return this.communityService.getMyListings(user);
  }

  @UseGuards(AuthGuard)
  @Get('inbox')
  async inbox(
    @CurrentUser() user: AuthenticatedUser,
    @Query('status') status?: string,
  ) {
    return this.communityService.getInbox(user, status);
  }

  @UseGuards(AuthGuard)
  @Get('outbox')
  async outbox(
    @CurrentUser() user: AuthenticatedUser,
    @Query('status') status?: string,
  ) {
    return this.communityService.getOutbox(user, status);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body()
    body: {
      title?: string;
      description?: string;
      category?: string;
      city?: string;
      district?: string;
      publisherType?: string;
      organizationName?: string;
      contactPhone?: string;
      imageUrls?: string[];
      animalName?: string;
      animalType?: string;
      breed?: string;
      ageText?: string;
      gender?: string;
      size?: string;
      healthNotes?: string;
      houseRules?: string;
      adoptionNotes?: string;
      quantityNeeded?: string;
      preferredFoodBrand?: string;
      supportDetails?: string;
      urgency?: string;
    },
  ) {
    return this.communityService.createListing(user, body);
  }

  @UseGuards(AuthGuard)
  @Post(':id/applications')
  async apply(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body()
    body: {
      message?: string;
      contactPhone?: string;
      offeredQuantity?: string;
    },
  ) {
    return this.communityService.createApplication(user, {
      listingId: id,
      ...body,
    });
  }

  @UseGuards(AuthGuard)
  @Post('applications/:id/decision')
  async decide(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() body: { action?: string },
  ) {
    return this.communityService.decideApplication(user, id, body.action);
  }

  @UseGuards(AuthGuard)
  @Post('applications/:id/cancel')
  async cancel(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
  ) {
    return this.communityService.cancelApplication(user, id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.communityService.getById(id);
  }
}