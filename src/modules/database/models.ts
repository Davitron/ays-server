import { User } from '../users/user.entity';
import { Profile } from '../profile/entities/profile.entity';
import { Education } from '../profile/entities/education.entity';
import { WorkExperience } from '../profile/entities/work-experience.entity';
import { Certification } from '../profile/entities/certification.entity';
import { RecruiterInfo } from '../profile/entities/recruiter-info.entity';
import { Job } from '../job/entities/job.entity';

export const models = [
  User,
  Profile,
  Education,
  WorkExperience,
  Certification,
  RecruiterInfo,
  Job,
];
