import * as jwt from 'jsonwebtoken';
import { Injectable} from '@nestjs/common';
import { IUser } from '../users/interfaces/user.interface';
import { JWTPayload } from './dto/jwt-payload.dto';
import { JWTTokenDto } from './dto/jwt-token.dto';

@Injectable()
export class JWTService {
  async createToken(payload: JWTPayload): Promise<JWTTokenDto> {
    const expiresIn = '1d';
    const secretOrKey = process.env.JWT_SECRET;
    const token = await jwt.sign(payload, secretOrKey, { expiresIn });
    return {
      expires: expiresIn,
      token,
    };
  }
}
