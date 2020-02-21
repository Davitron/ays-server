import { Injectable, BadRequestException, UnauthorizedException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as crypto from 'crypto';
import { UserService } from '../../users/user.service';
import { IAuthService } from '../interfaces/auth-service.interface';
import { LoginDto } from '../dto/login.dto';
import { JWTService } from './jwt.service';
import { NewUserDto } from '../dto/new-user.dto';
import { MailService } from '../../common/mail/services/mail.service';
import { ProfileService } from '../../profile/services/profile.service';
import { IMailInfo } from 'src/modules/common/mail/interface/mail-info.interface';

@Injectable()
export class AuthService implements IAuthService {

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private jwtService: JWTService,
    private mailService: MailService,
  ) {}

  private async _sendActivationLink(user: any): Promise<any> {
    const tokenData = await this.jwtService.createToken({id: user.id, email: user.email });
    const link = `${process.env.FRONTEND_URL}?token=${tokenData.token}`;
    const message = `Welcome to AYS. Activate your account with this link: <li>${link}</li>`;
    const mailInfo: IMailInfo = {
      recipient: user.email,
      message,
    };
    try {
      return await this.mailService.sendMail(mailInfo, 'raw');
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

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
    const { id, email }: any = createdUser.toJSON();
    const { lastName, firstName } = newUser;
    if (id) {
      this.profileService.create({ firstName, lastName, userId: id });
      await this._sendActivationLink({ id, email });
      return 'new user created';
    }
    throw new InternalServerErrorException('Error occured while creating user');
  }

  public async accountActivation(user: any): Promise<any> {
    const userData = await this.userService.findOne({ where: {  email: user.email } });
    if (!userData) {
      throw new NotFoundException('User cannot be found');
    }
    await this.userService.update(user.id, { isVerified: true });
    return 'user is activated';
  }
}
