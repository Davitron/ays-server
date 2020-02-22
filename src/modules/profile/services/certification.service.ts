import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ICertificationService } from '../interfaces/certification-service.interface';
import { Certification } from '../entities/certification.entity';
import { NewCertificationDto } from '../dto/new-certification.dto';
import { UpdateCertificationDto } from '../dto/update-certification.dto';

@Injectable()
export class CertificationService implements ICertificationService {
  constructor(
    @Inject('CertificationRepository') public readonly educationRepository: typeof Certification,
    @Inject('SequelizeInstance') private readonly sequelizeInstance,
  ) {}

  async create(newCertification: NewCertificationDto): Promise<Certification> {
    return await this.sequelizeInstance.transaction(async transaction => {
      return await this.educationRepository.create<Certification>(newCertification);
    });
  }

  async update(certificationId: number, newValues: UpdateCertificationDto, profileId: number): Promise<Certification | null> {
    return await this.sequelizeInstance.transaction(async transaction => {
      let certification = await this.educationRepository.findByPk<Certification>(certificationId);
      if (!certification) {throw new NotFoundException('Certification not found'); }
      if (certification.profileId !== profileId) {
        throw new UnauthorizedException('you are not authorized to perform this action');
      }
      certification = this._assign(certification, newValues);
      return await certification.save();
    });
  }

  public async delete(educationId: number, profileId: number): Promise<void> {
    return await this.sequelizeInstance.transaction(async transaction => {
      const certification = await this.educationRepository.findByPk<Certification>(educationId);
      if (!certification) {throw new NotFoundException('Certification not found'); }
      if (certification.profileId !== profileId) {
        throw new UnauthorizedException('you are not authorized to perform this action');
      }
      return certification.destroy();
    });
  }

  private _assign(certification: Certification, newValue: UpdateCertificationDto): Certification {
    for (const key of Object.keys(certification.toJSON())) {
        if ((certification[key] !== newValue[key]) && newValue[key]) {
          certification[key] = newValue[key];
        }
    }
    return certification as Certification;
  }
}
