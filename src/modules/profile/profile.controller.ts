import { Controller, Get, Param, Put, Body, Post, UseGuards, Request, Delete } from '@nestjs/common';
import { ProfileService } from './services/profile.service';
import { Profile } from './entities/profile.entity';
import { NewEducationDto } from './dto/new-education.dto';
import { Education } from './entities/education.entity';
import { UpdateEducationDto } from './dto/update-education.dto';
import { AuthGuard, CheckProfileGuard } from './guards';
import { EducationService } from './services/education.service';
import { CertificationService } from './services/certification.service';
import { NewCertificationDto } from './dto/new-certification.dto';
import { Certification } from './entities/certification.entity';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { WorkExperienceDto } from './dto/new-work-experience.dto';
import { WorkExperience } from './entities/work-experience.entity';
import { WorkExperienceService } from './services/work-experience.service';
import { UpdateWorkExperienceDto } from './dto/update-work-experience.dto';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { ProfileDto } from './dto/profile.dto';
import { UpdateProfileDto } from './dto/update.profile.dto';

@ApiTags('profile')
@ApiHeader({
  name: 'user-key',
  description: 'Login token',
})
@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private educationService: EducationService,
    private certificationService: CertificationService,
    private workExperienceService: WorkExperienceService,
  ) {}

  @Get(':profileId')
  public async getProfileById(@Param('profileId') profileId: number) {
    return this.profileService.getProfile(profileId);
  }

  @Get()
  @UseGuards(CheckProfileGuard)
  public async getProfile(@Request() req: any) {
    return this.profileService.getProfile(req.profileId);
  }

  @Put()
  @UseGuards(CheckProfileGuard)
  public async updateProfile(
    @Body() profile: UpdateProfileDto ,
    @Request() req: any,
  ): Promise<Profile> {
    return this.profileService.update(profile, req.userId);
  }

  @Post('education')
  @UseGuards(CheckProfileGuard)
  public async createEducation(
    @Body() education: NewEducationDto,
    @Request() req: any,
  ): Promise<Education> {
    const newEducation = { ...education, profileId: req.profileId };
    return await this.educationService.create(newEducation);
  }

  @Put('education/:educationId')
  @UseGuards(CheckProfileGuard)
  public async updateEducation(
    @Body() body: UpdateEducationDto,
    @Param('educationId') educationId: number,
    @Request() req: any,
  ): Promise<Education> {
    return await this.educationService.update(educationId, body, req.profileId);
  }

  @Delete('education/:educationId')
  @UseGuards(CheckProfileGuard)
  public async deleteEducation(
    @Param('educationId') educationId: number,
    @Request() req: any,
  ): Promise<void> {
    return await this.educationService.delete(educationId, req.profileId);
  }

  @Post('certification')
  @UseGuards(CheckProfileGuard)
  public async createCertification(
    @Body() certification: NewCertificationDto,
    @Request() req: any,
  ): Promise<Certification> {
    const newCertification = { ...certification, profileId: req.profileId };
    return await this.certificationService.create(newCertification);
  }

  @Put('certification/:certificationId')
  @UseGuards(CheckProfileGuard)
  public async updateCertification(
    @Body() body: UpdateCertificationDto,
    @Param('certificationId') certificationId: number,
    @Request() req: any,
  ): Promise<Certification> {
    return await this.certificationService.update(certificationId, body, req.profileId);
  }

  @Delete('certification/:certificationId')
  @UseGuards(CheckProfileGuard)
  public async deleteCertification(
    @Param('certificationId') certificationId: number,
    @Request() req: any,
  ): Promise<void> {
    return await this.certificationService.delete(certificationId, req.profileId);
  }

  @Post('workexperience')
  @UseGuards(CheckProfileGuard)
  public async createWorkExperience(
    @Body() workExperience: WorkExperienceDto,
    @Request() req: any,
  ): Promise<WorkExperience> {
    const newWorkExperience = { ...workExperience, profileId: req.profileId };
    return await this.workExperienceService.create(newWorkExperience);
  }

  @Put('workexperience/:workexperienceId')
  @UseGuards(CheckProfileGuard)
  public async updateWorkExperience(
    @Body() body: UpdateWorkExperienceDto,
    @Param('workexperienceId') workExperienceId: number,
    @Request() req: any,
  ): Promise<WorkExperience> {
    return await this.workExperienceService.update(workExperienceId, body, req.profileId);
  }

  @Delete('workexperience/:workexperienceId')
  @UseGuards(CheckProfileGuard)
  public async deleteWorkExperience(
    @Param('workexperienceId') workExperienceId: number,
    @Request() req: any,
  ): Promise<void> {
    return await this.workExperienceService.delete(workExperienceId, req.profileId);
  }
}
