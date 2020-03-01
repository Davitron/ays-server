import { Job } from '../entities/job.entity';
import { NewJobDto } from '../dto/new-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';

export interface IJobService {
  findAll(): Promise<Job[]>;
  findById(id: number): Promise<Job | null>;
  findOne(options: object): Promise<Job | null>;
  create(job: NewJobDto): Promise<Job>;
  update(id: number, newValue: UpdateJobDto): Promise<Job | null>;
}
