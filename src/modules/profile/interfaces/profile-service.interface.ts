import { Profile } from '../entities/profile.entity';
import { ProfileDto } from '../dto/profile.dto';

export interface IProfileService {
  create(profile: ProfileDto): Promise<Profile>;
  update(profile: ProfileDto, userId?: number): Promise<Profile>;
  getProfile(userid?: number): Promise<Profile>;
}
