import { Inject, Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { IEducationService } from '../interfaces/education-service.interface';
import { Education } from '../entities/education.entity';
import { NewEducationDto } from '../dto/new-education.dto';
import { UpdateEducationDto } from '../dto/update-education.dto';
import { CreateOptions } from 'sequelize/types';

@Injectable()
export class EducationService implements IEducationService {
  constructor(
    @Inject('EducationRepository') public readonly educationRepository: typeof Education,
    @Inject('SequelizeInstance') private readonly sequelizeInstance,
  ) {}

  async create(newEducation: NewEducationDto): Promise<Education> {
    // console.log('here');
    return await this.sequelizeInstance.transaction(async transaction => {
      return await this.educationRepository.create<Education>(newEducation);
    });
  }

  async update(educationId: number, newValues: UpdateEducationDto, profileId: number): Promise<Education | null> {
    return await this.sequelizeInstance.transaction(async transaction => {
      let education = await this.educationRepository.findByPk<Education>(educationId);
      if (!education) {throw new NotFoundException('Education History not found'); }
      if (education.profileId !== profileId) {
        throw new UnauthorizedException('you are not authorized to perform this action');
      }
      education = this._assign(education, newValues);
      return await education.save({
        returning: true,
        transaction,
      } as CreateOptions);
    });
  }

  public async delete(educationId: number, profileId: number): Promise<void> {
    return await this.sequelizeInstance.transaction(async transaction => {
      const education = await this.educationRepository.findByPk<Education>(educationId);
      if (!education) {throw new NotFoundException('Education History not found'); }
      if (education.profileId !== profileId) {
        throw new UnauthorizedException('you are not authorized to perform this action');
      }
      return education.destroy();
    });
  }

  private _assign(education: Education, newValue: UpdateEducationDto): Education {
    for (const key of Object.keys(education.toJSON())) {
        // tslint:disable-next-line: curly
        if ((education[key] !== newValue[key]) && newValue[key]) {
          education[key] = newValue[key];
        }
    }
    return education as Education;
  }
}
