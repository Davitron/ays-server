import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './services/profile.service';
import { WorkExperienceService } from './services/work-experience.service';
import { EducationService } from './services/education.service';
import { CertificationService } from './services/certification.service';
import { profilesProvider } from './providers/profile.provider';
import { DatabaseModule } from '../database/database.module';
import { workProvider } from './providers/work-experience.providers';
import { educationProvider } from './providers/education.provider';
import { certificationProvider } from './providers/certification.providers';
import { usersProvider } from '../users/user.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    WorkExperienceService,
    EducationService,
    CertificationService,
    profilesProvider,
    workProvider,
    educationProvider,
    certificationProvider,
    usersProvider,
  ],
  exports: [ ProfileService ],
})
export class ProfileModule {}
