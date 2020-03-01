import { Inject, Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Profile } from '../../modules/profile/entities/profile.entity';

@Injectable()
export class CheckProfileGuard implements CanActivate {

  constructor(
    @Inject('ProfileRepository') public readonly profileRepository: typeof Profile,
  ) {}
  async getProfile(userId: number) {
    const profile = await this.profileRepository.findOne<Profile>({
      where: {userId},
    });
    return profile;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.userId) {
      const profile = await this.getProfile(request.userId);
      if (!profile.id) {
        return false;
      }
      request.profileId = profile.id;
      return true;
    }
    return false;
  }
}
