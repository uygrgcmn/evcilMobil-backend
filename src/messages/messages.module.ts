import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { MessagesGateway } from './messages.gateway';
import { MessagesPushService } from './messages-push.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesGateway, MessagesPushService],
  exports: [MessagesService],
})
export class MessagesModule { }
