import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JWTService } from './jwt.service';
import {MailModule } from '../common/mail/mail.module';

@Module({
  imports: [ UsersModule, PassportModule, MailModule ],
  controllers: [AuthController],
  providers: [AuthService, JWTService],
})
export class AuthModule {}
