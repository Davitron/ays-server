import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { usersProvider } from '../users/user.provider';

@Controller()
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('auth/login')
  public async login(@Body() body) {
    const user = await this.authService.authenticate(body);
    return user;
  }

  @Post('auth/register')
  public async register(@Body() body) {
    const result = await this.authService.register(body);
    return result;
  }
}
