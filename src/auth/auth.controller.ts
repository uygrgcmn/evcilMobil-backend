import { BadRequestException, Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import type { DeviceTokenInput, LoginInput, RegisterInput } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() body: RegisterInput) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginInput) {
    return this.authService.login(body);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@CurrentUser('id') userId: string) {
    return this.authService.me(userId);
  }

  @UseGuards(AuthGuard)
  @Post('device-token')
  async upsertDeviceToken(
    @CurrentUser('id') userId: string,
    @Body() body: DeviceTokenInput = {},
  ) {
    if (!Object.prototype.hasOwnProperty.call(body, 'token')) {
      throw new BadRequestException('token field is required');
    }

    if (body.token !== null && body.token !== undefined && typeof body.token !== 'string') {
      throw new BadRequestException('token must be string or null');
    }

    return this.authService.upsertDeviceToken(userId, body.token ?? null);
  }
}
