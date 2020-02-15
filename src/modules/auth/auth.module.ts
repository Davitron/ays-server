import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JWTService } from './jwt.service';
import {MailModule } from '../common/mail/mail.module';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [ UsersModule, PassportModule, MailModule, ProfileModule],
  controllers: [AuthController],
  providers: [AuthService, JWTService],
})
export class AuthModule {}
