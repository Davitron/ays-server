import { Injectable, BadRequestException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import * as crypto from 'crypto';
import { UserService } from '../users/user.service';
import { IAuthService } from './interfaces/auth-service.interface';
import { LoginDto } from './dto/login.dto';
import { JWTService } from './jwt.service';
import { NewUserDto } from './dto/new-user.dto';
import { MailService } from '../common/mail/mail.service';
import { ProfileService } from '../profile/services/profile.service';

@Injectable()
export class AuthService implements IAuthService {

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
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
    const createdUser = await this.userService.create(newUser);
    // console.log(createdUser);
    const { id, email }: any = createdUser.toJSON();
    const { lastName, firstName } = newUser;
    if (id) {
      this.profileService.create({ firstName, lastName, userId: id });
      // await this.mailService.sendRaw('new user created', email);
      return 'new user created';
    }
    throw new InternalServerErrorException('Error occured while creating user');
  }
}
