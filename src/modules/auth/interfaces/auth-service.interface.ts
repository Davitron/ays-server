import { User } from '../../users/user.entity';
import { LoginDto } from '../dto/login.dto';
import { JWTTokenDto } from '../dto/jwt-token.dto';

export interface IAuthService {
  authenticate(credentials: LoginDto): Promise<JWTTokenDto>;
  register(newUser): Promise<any>;
}
