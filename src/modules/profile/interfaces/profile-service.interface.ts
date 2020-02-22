import { Profile } from '../entities/profile.entity';
import { ProfileDto } from '../dto/profile.dto';
import { UpdateProfileDto } from '../dto/update.profile.dto';

export interface IProfileService {
  create(profile: ProfileDto): Promise<Profile>;
  update(profile: UpdateProfileDto, userId?: number): Promise<Profile>;
  getProfile(profileId?: number, role?: string): Promise<Profile>;
}
