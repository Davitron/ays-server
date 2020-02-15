import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { IProfileService } from '../interfaces/profile-service.interface';
import { ProfileDto } from '../dto/profile.dto';
import { Profile } from '../entities/profile.entity';
import { WorkExperience } from '../entities/work-experience.entity';
import { Education } from '../entities/education.entity';
import { Certification } from '../entities/certification.entity';
import { EducationService } from './education.service';

const profileAttr = [ 'id', 'title', 'firstName', 'lastName', 'profilePic', 'location', 'phoneNumber', 'profileViews', 'createdAt'];
const workAttr = ['id', 'company', 'position', 'description', 'startDate', 'endDate'];
const educationAttr = ['id', 'institution', 'degree', 'areaOfStudy', 'activities', 'startDate', 'endDate' ];
const certAttr = ['id', 'organization', 'title', 'linkToDoc', 'description', 'issueDate', 'expiryDate' ];

@Injectable()
export class ProfileService implements IProfileService {
  constructor(
    @Inject('ProfileRepository') public readonly profileRepository: typeof Profile,
    @Inject('EducationRepository') public readonly educationRepository: typeof Education,
    @Inject('SequelizeInstance') private readonly sequelizeInstance,
    private educationService: EducationService,
    ) {}

  public async getProfile(profileId?: number): Promise<Profile> {
    const profile = await this.profileRepository.findByPk<Profile>(profileId, {
      attributes:  [ ...profileAttr ],
      include: [
        { model: WorkExperience, attributes: [...workAttr]},
        { model: Education, attributes: [...educationAttr]},
        { model: Certification, attributes: [...certAttr]},
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

  public async update(profileData: ProfileDto, userId?: number): Promise<Profile> {
    return await this.sequelizeInstance.transaction(async transaction => {
      let profile = await this.profileRepository.findOne<Profile>({ where: { userId }});
      profile = this._assign(profile, profileData);
      return await profile.save();
    });
  }

  private _assign(profile: Profile, newValue: ProfileDto): Profile {
    for (const key of Object.keys(profile.toJSON())) {
        // tslint:disable-next-line: curly
        if ((profile[key] !== newValue[key]) && newValue[key]) {
          profile[key] = newValue[key];
        }
    }
    return profile as Profile;
  }

}
