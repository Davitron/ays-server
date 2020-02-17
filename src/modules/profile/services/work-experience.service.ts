import { Inject, Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { IWorkExperience } from '../interfaces/work-experience.interface';
import { WorkExperience } from '../entities/work-experience.entity';
import { WorkExperienceDto } from '../dto/new-work-experience.dto';
import { UpdateWorkExperienceDto } from '../dto/update-work-experience.dto';
import { CreateOptions } from 'sequelize/types';

@Injectable()
export class WorkExperienceService implements IWorkExperience {
  constructor(
    @Inject('WorkExperienceRepository') public readonly workexperienceRepository: typeof WorkExperience,
    @Inject('SequelizeInstance') private readonly sequelizeInstance,
  ) {}

  async create(newWorkExperience: WorkExperienceDto): Promise<WorkExperience> {
    // console.log('here');
    return await this.sequelizeInstance.transaction(async transaction => {
      return await this.workexperienceRepository.create<WorkExperience>(newWorkExperience);
    });
  }

  async update(workexperienceId: number, newValues: UpdateWorkExperienceDto, profileId: number): Promise<WorkExperience | null> {
    return await this.sequelizeInstance.transaction(async transaction => {
      let workexperience = await this.workexperienceRepository.findByPk<WorkExperience>(workexperienceId);
      if (!workexperience) {throw new NotFoundException('Work Experience not found'); }
      if (workexperience.profileId !== profileId) {
        throw new UnauthorizedException('you are not authorized to perform this action');
      }
      workexperience = this._assign(workexperience, newValues);
      return await workexperience.save({
        returning: true,
        transaction,
      } as CreateOptions);
    });
  }

  public async delete(workexperienceId: number, profileId: number): Promise<void> {
    return await this.sequelizeInstance.transaction(async transaction => {
      const workexperience = await this.workexperienceRepository.findByPk<WorkExperience>(workexperienceId);
      if (!workexperience) {throw new NotFoundException('Work Experience not found'); }
      if (workexperience.profileId !== profileId) {
        throw new UnauthorizedException('you are not authorized to perform this action');
      }
      return workexperience.destroy();
    });
  }

  private _assign(workexperience: WorkExperience, newValue: UpdateWorkExperienceDto): WorkExperience {
    for (const key of Object.keys(workexperience.toJSON())) {
        // tslint:disable-next-line: curly
        if ((workexperience[key] !== newValue[key]) && newValue[key]) {
          workexperience[key] = newValue[key];
        }
    }
    return workexperience as WorkExperience;
  }
}
