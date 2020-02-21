import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class DecodeVerifyToken implements CanActivate {

  async validateToken(reqToken: string) {
      try {
        const  { id, email }: any = jwt.verify(reqToken, process.env.JWT_SECRET);
        return { id, email };
      } catch (error) {
        return null;
      }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.query.token) {
      throw new UnauthorizedException('You are not authorized to view this');
    }
    request.user = await this.validateToken(request.query.token);
    return true;
  }
}
