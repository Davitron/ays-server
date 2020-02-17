import { Sequelize } from 'sequelize-typescript';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProfileService } from '../interfaces/profile-service.interface';
import { ProfileDto } from '../dto/profile.dto';
import { UpdateProfileDto } from '../dto/update.profile.dto';
import { Profile } from '../entities/profile.entity';
import { WorkExperience } from '../entities/work-experience.entity';
import { Education } from '../entities/education.entity';
import { Certification } from '../entities/certification.entity';
import { User } from 'src/modules/users/user.entity';

const profileAttr = [ 'id', 'title', 'firstName', 'lastName', 'profilePic', 'country', 'state', 'phoneNumber', 'profileViews', 'createdAt'];
const workAttr = ['id', 'company', 'position', 'description', 'startDate', 'endDate'];
const educationAttr = ['id', 'institution', 'degree', 'course', 'description', 'startDate', 'endDate' ];
const certAttr = ['id', 'organization', 'title', 'linkToDoc', 'description', 'issueDate', 'expiryDate' ];

@Injectable()
export class ProfileService implements IProfileService {
  constructor(
    @Inject('ProfileRepository') public readonly profileRepository: typeof Profile,
    @Inject('EducationRepository') public readonly educationRepository: typeof Education,
    @Inject('SequelizeInstance') private readonly sequelizeInstance,
    ) {}

  public async getProfile(profileId?: number): Promise<Profile> {
    const profile = await this.profileRepository.findByPk<Profile>(profileId, {
      attributes: [
        ...profileAttr,
        [Sequelize.literal('"user"."email"'), 'email'],
      ],
      include: [
        { model: WorkExperience, attributes: [...workAttr]},
        { model: Education, attributes: [...educationAttr]},
        { model: Certification, attributes: [...certAttr]},
        { model: User, attributes: []},
      ],
    });
    if (!profile) { throw new NotFoundException('profile not found'); }
    return profile;
  }

  public async create(profileData: ProfileDto): Promise<Profile> {
    return await this.sequelizeInstance.transaction(async transaction => {
      return await this.profileRepository.create<Profile>(profileData);
    });
  }

  public async update(profileData: UpdateProfileDto, userId?: number): Promise<Profile> {
    return await this.sequelizeInstance.transaction(async transaction => {
      let profile = await this.profileRepository.findOne<Profile>({ where: { userId }});
      profile = this._assign(profile, profileData);
      return await profile.save();
    });
  }

  private _assign(profile: Profile, newValue: UpdateProfileDto): Profile {
    for (const key of Object.keys(profile.toJSON())) {
        // tslint:disable-next-line: curly
        if ((profile[key] !== newValue[key]) && newValue[key]) {
          profile[key] = newValue[key];
        }
    }
    return profile as Profile;
  }

}
