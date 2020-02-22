import { Inject, Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { IRecruiterInfoService } from '../interfaces/recruiter-info-service.interface';
import { RecruiterInfoRequestDto } from '../dto/new-recruiter-info.dto';
import { UpdateRecruiterInfoDto } from '../dto/update-recruiter-info.dto';
import {RecruiterInfo} from '../entities/recruiter-info.entity';
import { CreateOptions } from 'sequelize/types';

@Injectable()
export class RecruiterInfoService implements IRecruiterInfoService {

  constructor(
    @Inject('RecuiterInfoRepository') public readonly recruiterInfoRepository: typeof RecruiterInfo,
    @Inject('SequelizeInstance') private readonly sequelizeInstance,
    ) {}

    async create(newRecruiter: RecruiterInfoRequestDto): Promise<RecruiterInfo> {
      return await this.sequelizeInstance.transaction(async transaction => {
        return await this.recruiterInfoRepository.create<RecruiterInfo>(newRecruiter);
    });
  }

  async update(recruiterInfoId: number, updateRecruiter: UpdateRecruiterInfoDto, profileId: number): Promise<RecruiterInfo> {
    return await this.sequelizeInstance.transaction(async transaction => {
      let recruiterInfo = await this.recruiterInfoRepository.findByPk<RecruiterInfo>(recruiterInfoId);
      if (!recruiterInfo) {throw new NotFoundException('Recruiter info not found'); }
      if (recruiterInfo.profileId !== profileId) {
        throw new UnauthorizedException('you are not authorized to perform this action');
      }
      recruiterInfo = this._assign(recruiterInfo, updateRecruiter);
      return await recruiterInfo.save({
        returning: true,
        transaction,
      } as CreateOptions);
    });
  }

  async delete(recruiterInfoId: number, profileId: number): Promise<void> {
    return await this.sequelizeInstance.transaction(async transaction => {
      const recruiter = await this.recruiterInfoRepository.findByPk<RecruiterInfo>(recruiterInfoId);
      if (!recruiter) {throw new NotFoundException('Employer not found'); }
      if (recruiter.profileId !== profileId) {
        throw new UnauthorizedException('you are not authorized to perform this action');
      }
      return recruiter.destroy();
    });
  }

  private _assign(recruiterInfo: RecruiterInfo, newValue: UpdateRecruiterInfoDto): RecruiterInfo {
    for (const key of Object.keys(recruiterInfo.toJSON())) {
      if ((recruiterInfo[key] !== newValue[key]) && newValue[key]) {
        recruiterInfo[key] = newValue[key];
      }
    }
    return recruiterInfo as RecruiterInfo;
  }
}
