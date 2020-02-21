import * as jwt from 'jsonwebtoken';
import { Injectable} from '@nestjs/common';
import { JWTPayload } from '../dto/jwt-payload.dto';
import { JWTTokenDto } from '../dto/jwt-token.dto';

@Injectable()
export class JWTService {
  async createToken(payload: JWTPayload, expires?: 'string'): Promise<JWTTokenDto> {
    const expiresIn = expires || '1d';
    const secretOrKey = process.env.JWT_SECRET;
    const token = await jwt.sign(payload, secretOrKey, { expiresIn });
    return {
      expires: expiresIn,
      token,
    };
  }
}
