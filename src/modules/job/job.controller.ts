import { Controller, Get, Post, Put, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { JobService } from './services/job.service';
import { Job } from './entities/job.entity';
import { NewJobDto } from './dto/new-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { AuthGuard, CheckProfileGuard } from '../../shared/guards';

@ApiTags('Job')
@ApiHeader({
  name: 'user-key',
  description: 'Login token',
})
@Controller('job')
@UseGuards(AuthGuard)
export class JobController {
  constructor(
    private jobService: JobService,
  ) {}

  @Get()
  public async getAllJobs(): Promise<Job[]> {
    return await this.jobService.findAll();
  }

  @Get()
  public async getAllJobsByEmployer(): Promise<Job[]>  {
    return await this.jobService.findAll();
  }

  @Get(':jobId')
  public async getJob(
    @Param('jobId') jobId: number,
  ): Promise<Job> {
    return await this.jobService.findById(jobId);
  }

  @Post()
  @UseGuards(CheckProfileGuard)
  public async createJob(
    @Body() job: NewJobDto,
    @Request() req: any,
  ): Promise<Job> {
    const newJob = { ...job, employerId: req.profileId };
    return await this.jobService.create(newJob);
  }

  @Put(':jobId')
  @UseGuards(CheckProfileGuard)
  public async updateJob(
    @Param('jobId') jobId: number,
    @Body() job: UpdateJobDto,
    @Request() req: any,
  ): Promise<Job> {
    return await this.jobService.update(jobId, job);
  }
}
