import { WorkExperienceDto } from '../dto/new-work-experience.dto';
import { WorkExperience } from '../entities/work-experience.entity';
import { UpdateWorkExperienceDto } from '../dto/update-work-experience.dto';

export interface IWorkExperience {
  create(workExperience: WorkExperienceDto): Promise<WorkExperience>;
  update(workExperienceId: number, updateWorkExperience: UpdateWorkExperienceDto, profileId: number): Promise<WorkExperience | null>;
  delete(workExperienceId: number, profileId: number): Promise<void>;
}
