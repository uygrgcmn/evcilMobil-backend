import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
