import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { AuthenticatedUser } from '../auth/auth.types';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
@UseGuards(AuthGuard)
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) { }

    @Get('inbox')
    async inbox(
        @CurrentUser() user: AuthenticatedUser,
        @Query('status') status?: string,
    ) {
        return this.reservationsService.getInbox(user, status);
    }

    @Get('outbox')
    async outbox(
        @CurrentUser() user: AuthenticatedUser,
        @Query('status') status?: string,
    ) {
        return this.reservationsService.getOutbox(user, status);
    }

    @Post()
    async create(
        @CurrentUser() user: AuthenticatedUser,
        @Body()
        body: {
            listingId?: string;
            startDate?: string;
            endDate?: string;
            message?: string;
        },
    ) {
        return this.reservationsService.createReservation(user, body);
    }

    @Post('from-thread/:threadId')
    async createFromThread(
        @CurrentUser() user: AuthenticatedUser,
        @Param('threadId') threadId: string,
        @Body()
        body: {
            startDate?: string;
            endDate?: string;
            message?: string;
        },
    ) {
        return this.reservationsService.createReservationFromThread(user, threadId, body);
    }

    @Post(':id/decision')
    async decide(
        @CurrentUser() user: AuthenticatedUser,
        @Param('id') id: string,
        @Body() body: { action?: string },
    ) {
        return this.reservationsService.decideReservation(user, id, body.action);
    }

    @Post(':id/cancel')
    async cancel(
        @CurrentUser() user: AuthenticatedUser,
        @Param('id') id: string,
    ) {
        return this.reservationsService.cancelReservation(user, id);
    }

    @Get(':id/report')
    async getReport(
        @CurrentUser() user: AuthenticatedUser,
        @Param('id') id: string,
    ) {
        return this.reservationsService.getReservationReport(user, id);
    }

    @Post(':id/report')
    async upsertReport(
        @CurrentUser() user: AuthenticatedUser,
        @Param('id') id: string,
        @Body()
        body: {
            summary?: string;
            mediaUrls?: string[];
            feedingNotes?: string;
            activityNotes?: string;
            toiletNotes?: string;
            medicationNotes?: string;
        },
    ) {
        return this.reservationsService.upsertReservationReport(user, id, body);
    }

    @Get('availability/:sitterId')
    async getSitterAvailability(
        @Param('sitterId') sitterId: string,
        @Query('from') from?: string,
        @Query('to') to?: string,
    ) {
        return this.reservationsService.getSitterAvailability(sitterId, from, to);
    }

    @Put('availability')
    async setMyAvailability(
        @CurrentUser() user: AuthenticatedUser,
        @Body() body: {
            days?: Array<{ date?: string; isAvailable?: boolean }>;
        },
    ) {
        return this.reservationsService.setMyAvailability(user, body.days ?? []);
    }
}
