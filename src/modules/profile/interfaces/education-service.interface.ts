import { Education } from '../entities/education.entity';
import { NewEducationDto } from '../dto/new-education.dto';
import { UpdateEducationDto } from '../dto/update-education.dto';

export interface IEducationService {
  create(newEducation: NewEducationDto): Promise<Education>;
  update(educationId: number, updateEducation: UpdateEducationDto, profileId: number): Promise<Education | null>;
  delete(educationId: number, profileId: number): Promise<void>;
}
