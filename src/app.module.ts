import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommunityModule } from './community/community.module';
import { HealthModule } from './health/health.module';
import { ListingsModule } from './listings/listings.module';
import { LocationModule } from './location/location.module';
import { MessagesModule } from './messages/messages.module';
import { ProfileModule } from './profile/profile.module';
import { ReservationsModule } from './reservations/reservations.module';
import { SittersModule } from './sitters/sitters.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    AuthModule,
    CommunityModule,
    HealthModule,
    ListingsModule,
    LocationModule,
    SittersModule,
    MessagesModule,
    ProfileModule,
    ReservationsModule,
    PrismaModule,
  ],
})
export class AppModule { }
