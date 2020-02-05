import { Injectable, BadRequestException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import * as crypto from 'crypto';
import { UserService } from '../users/user.service';
import { IAuthService } from './interfaces/auth-service.interface';
import { LoginDto } from './dto/login.dto';
import { JWTService } from './jwt.service';
import { NewUserDto } from './dto/new-user.dto';
import { MailService } from '../common/mail/mail.service';

@Injectable()
export class AuthService implements IAuthService {

  constructor(
    private userService: UserService,
    private jwtService: JWTService,
    private mailService: MailService,
  ) {}

  public async authenticate(credentials: LoginDto): Promise<any> {
    const user = await this.userService.findOne({
      where: {
          email: credentials.email,
          password: crypto.createHmac('sha256', credentials.password).digest('hex'),
      },
    });
    if (!user) {
      throw new UnauthorizedException('Incorrect user credentials');
    }
    const token = this.jwtService.createToken({id: user.id, email: user.email });
    return token;
  }

  public async register(newUser: NewUserDto): Promise<any> {
    const user = await this.userService.findOne({ where: {  email: newUser.email } });
    if (user) {
      throw new BadRequestException('User is already registered');
    }
    const createdUser = await await this.userService.create(newUser);
    const parsed: any  = createdUser.toJSON();
    if (parsed.email) {
      await this.mailService.sendRaw('New user created', parsed.email);
      return 'New user created';
    }
    throw new InternalServerErrorException('Unable to create user');
  }
}
