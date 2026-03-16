import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { AuthenticatedUser } from '../auth/auth.types';
import { CommunityService } from './community.service';

@Controller('community')
export class CommunityController {
    constructor(private readonly communityService: CommunityService) { }

    private parseIncludeClosed(includeClosed?: string): boolean {
        return includeClosed?.trim().toLowerCase() === 'true';
    }

    @Get('feed')
    async feed(
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
            includeClosed: this.parseIncludeClosed(includeClosed),
        });
    }

    @Get('adoptions')
    async adoptions(
        @Query('city') city?: string,
        @Query('district') district?: string,
        @Query('publisherType') publisherType?: string,
        @Query('includeClosed') includeClosed?: string,
    ) {
        return this.communityService.getAdoptionFeed({
            city,
            district,
            publisherType,
            includeClosed: this.parseIncludeClosed(includeClosed),
        });
    }

    @Get('food-support')
    async foodSupport(
        @Query('city') city?: string,
        @Query('district') district?: string,
        @Query('publisherType') publisherType?: string,
        @Query('includeClosed') includeClosed?: string,
    ) {
        return this.communityService.getFoodSupportFeed({
            city,
            district,
            publisherType,
            includeClosed: this.parseIncludeClosed(includeClosed),
        });
    }

    @UseGuards(AuthGuard)
    @Get('mine')
    async mine(@CurrentUser() user: AuthenticatedUser) {
        return this.communityService.getMyListings(user);
    }

    @UseGuards(AuthGuard)
    @Get('applications/inbox')
    async inbox(
        @CurrentUser() user: AuthenticatedUser,
        @Query('status') status?: string,
    ) {
        return this.communityService.getInbox(user, status);
    }

    @UseGuards(AuthGuard)
    @Get('applications/outbox')
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
    @Post('adoptions')
    async createAdoption(
        @CurrentUser() user: AuthenticatedUser,
        @Body()
        body: {
            title?: string;
            description?: string;
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
            urgency?: string;
        },
    ) {
        return this.communityService.createAdoptionListing(user, body);
    }

    @UseGuards(AuthGuard)
    @Post('food-support')
    async createFoodSupport(
        @CurrentUser() user: AuthenticatedUser,
        @Body()
        body: {
            title?: string;
            description?: string;
            city?: string;
            district?: string;
            publisherType?: string;
            organizationName?: string;
            contactPhone?: string;
            imageUrls?: string[];
            quantityNeeded?: string;
            preferredFoodBrand?: string;
            supportDetails?: string;
            urgency?: string;
        },
    ) {
        return this.communityService.createFoodSupportListing(user, body);
    }

    @UseGuards(AuthGuard)
    @Post(':id/applications')
    async createApplication(
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
    async decideApplication(
        @CurrentUser() user: AuthenticatedUser,
        @Param('id') id: string,
        @Body() body: { action?: string },
    ) {
        return this.communityService.decideApplication(user, id, body.action);
    }

    @UseGuards(AuthGuard)
    @Post('applications/:id/cancel')
    async cancelApplication(
        @CurrentUser() user: AuthenticatedUser,
        @Param('id') id: string,
    ) {
        return this.communityService.cancelApplication(user, id);
    }

    @UseGuards(AuthGuard)
    @Get(':id/sitter-leads')
    async sitterLeads(
        @Param('id') id: string,
        @Query('limit') limit?: string,
    ) {
        return this.communityService.getSitterLeads(id, limit);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.communityService.getById(id);
    }
}
