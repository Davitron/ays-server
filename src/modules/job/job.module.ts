import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './services/job.service';
import { jobProvider } from './providers/job.provider';
import { DatabaseModule } from '../database/database.module';
import { usersProvider } from '../users/user.provider';
import { profilesProvider } from '../profile/providers/profile.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [JobController],
  providers: [JobService, jobProvider, usersProvider, profilesProvider],
})
export class JobModule {}
