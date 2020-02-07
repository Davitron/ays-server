import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { NewUserDto } from './dto/new-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('auth/login')
  public async login(@Body() body: LoginDto) {
    const user = await this.authService.authenticate(body);
    return user;
  }

  @Post('auth/register')
  public async register(@Body() body: NewUserDto) {
    const result = await this.authService.register(body);
    return result;
  }
}
