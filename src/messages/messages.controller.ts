import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { AuthenticatedUser } from '../auth/auth.types';
import { MessagesService } from './messages.service';

@Controller('messages')
@UseGuards(AuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @Get()
  async list(
    @CurrentUser() user: AuthenticatedUser,
    @Query('search') search?: string,
  ) {
    return this.messagesService.list(user, search);
  }

  @Post('start')
  async start(
    @CurrentUser() user: AuthenticatedUser,
    @Body()
    body: {
      sitterId?: string;
      ownerId?: string;
      listingId?: string;
      initialMessage?: string;
    },
  ) {
    return this.messagesService.startConversation(user, body);
  }

  @Get(':id')
  async findOne(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
  ) {
    return this.messagesService.findOne(user, id);
  }

  @Post(':id/messages')
  async sendMessage(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() body: { message?: string },
  ) {
    return this.messagesService.sendMessage(user, id, body.message);
  }
}
