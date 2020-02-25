import { Inject, Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/modules/users/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    @Inject('UserRepository') public readonly userRepository: typeof User,
  ) {}

  async validateToken(reqToken: string) {
    const [ bearer, token ] = reqToken.split(' ');
    if (bearer === 'Bearer') {
      try {
        const  { id, role }: any = jwt.verify(token, process.env.JWT_SECRET);
        const user = await this.userRepository.findByPk<User>(id);
        if (!user) { return null; }
        return { id, role };
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken: string = request.headers['user-key'];
    if (!bearerToken) {
      throw new UnauthorizedException('You are not authorized to view this');
    }

    const user = await this.validateToken(bearerToken);
    if (!user) { throw new UnauthorizedException('You are not authorized to view this'); }
    const { id, role } = user;
    request.userId = id;
    request.userRole = role;

    return true;
  }
}
