import { Controller, Body, Post, UseGuards, BadRequestException, InternalServerErrorException, Request, Get } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LoginDto } from './dto/login.dto';
import { NewUserDto } from './dto/new-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProfileService } from '../profile/services/profile.service';
import { Profile } from '../profile/entities/profile.entity';
import { DecodeVerifyToken } from './guards/decode-verify-token.guard';
// import { MailService } from '../common/mail/mail.service';

@ApiTags('auth')
@Controller()
export class AuthController {

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    // private mailService: MailService,
    ) {}

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

  @Get('auth/activate')
  @UseGuards(DecodeVerifyToken)
  public async activateAccount(@Request() req: any) {
    const result = await this.authService.accountActivation(req.user);
    return result;
  }
}
