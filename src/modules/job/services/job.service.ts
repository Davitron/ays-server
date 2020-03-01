import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { IJobService } from '../interfaces/job-service.interface';
import { Job } from '../entities/job.entity';
import { NewJobDto } from '../dto/new-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';
import { CreateOptions } from 'sequelize/types';

@Injectable()
export class JobService implements IJobService {

  constructor(
    @Inject('JobRepository') private readonly jobRepository: typeof Job,
    @Inject('SequelizeInstance') private readonly sequelizeInstance,
  ) {}

  public async findAll(): Promise<Job[]> {
    return await this.jobRepository.findAll<Job>();
  }

  public async findById(id: number): Promise<Job> {
    return await this.jobRepository.findByPk<Job>(id);
  }

  public async findOne(options: object): Promise<Job> {
    return await this.jobRepository.findOne<Job>(options);
  }

  public async create(job: NewJobDto,): Promise<Job> {
    try {
      return await this.sequelizeInstance.transaction(async transaction => {
        return await this.jobRepository.create<Job>(job, {
          returning: true,
          transaction,
        } as CreateOptions);
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async update(id: number, newValue: UpdateJobDto): Promise<Job> {
    return await this.sequelizeInstance.transaction(async transaction => {
      let job = await this.jobRepository.findByPk<Job>(id, {
          transaction,
      });
      // tslint:disable-next-line: curly
      if (!job) throw new NotFoundException('JOB IS NOT FOUND');
      job = this._assign(job, newValue);
      return await job.save({
          returning: true,
          transaction,
      } as CreateOptions);
    });
  }

  private _assign(job: Job, newValue: UpdateJobDto): Job {
    for (const key of Object.keys(job.toJSON())) {
        // tslint:disable-next-line: curly
        if ((job[key] !== newValue[key]) && newValue[key]) {
          job[key] = newValue[key];
        }
    }
    return job as Job;
  }

}
