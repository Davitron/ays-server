import { RecruiterInfoRequestDto } from '../dto/new-recruiter-info.dto';
import { UpdateRecruiterInfoDto } from '../dto/update-recruiter-info.dto';
import { RecruiterInfo } from '../entities/recruiter-info.entity';

export interface IRecruiterInfoService {
  create(newRecruiter: RecruiterInfoRequestDto): Promise<RecruiterInfo>;
  update(recruiterInfoId: number, updateRecruiter: UpdateRecruiterInfoDto, profileId: number): Promise<RecruiterInfo | null>;
  delete(recruiterInfoId: number, profileId: number): Promise<void>;
}
