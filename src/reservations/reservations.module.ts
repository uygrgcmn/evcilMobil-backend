import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { MessagesModule } from '../messages/messages.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

@Module({
    imports: [PrismaModule, AuthModule, MessagesModule],
    controllers: [ReservationsController],
    providers: [ReservationsService],
})
export class ReservationsModule { }
