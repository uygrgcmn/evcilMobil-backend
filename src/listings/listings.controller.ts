import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { AuthenticatedUser } from '../auth/auth.types';
import { ListingsService } from './listings.service';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) { }

  private parseIncludeDemo(includeDemo?: string): boolean {
    return includeDemo?.trim().toLowerCase() === 'true';
  }

  @UseGuards(AuthGuard)
  @Get('mine')
  async mine(@CurrentUser() user: AuthenticatedUser) {
    return this.listingsService.getMyListings(user);
  }

  @Get('featured')
  async featured(
    @Query('for') forRole?: string,
    @Query('includeDemo') includeDemo?: string,
  ) {
    return this.listingsService.getFeatured(forRole, {
      includeDemo: this.parseIncludeDemo(includeDemo),
    });
  }

  @Get('nearby')
  async nearby(
    @Query('for') forRole?: string,
    @Query('city') city?: string,
    @Query('district') district?: string,
    @Query('includeDemo') includeDemo?: string,
  ) {
    return this.listingsService.getNearby(forRole, city, district, {
      includeDemo: this.parseIncludeDemo(includeDemo),
    });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('for') forRole?: string,
    @Query('includeDemo') includeDemo?: string,
  ) {
    return this.listingsService.getById(id, forRole, {
      includeDemo: this.parseIncludeDemo(includeDemo),
    });
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body()
    body: {
      title?: string;
      description?: string;
      city?: string;
      district?: string;
      budgetPerDay?: number | string;
      servicePricePerDay?: number | string;
      serviceUnit?: string;
      serviceIcon?: string;
    },
  ) {
    return this.listingsService.createMyListing(user, body);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
  ) {
    return this.listingsService.deleteMyListing(user, id);
  }
}
