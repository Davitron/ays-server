import { Certification } from '../entities/certification.entity';
import { NewCertificationDto } from '../dto/new-certification.dto';
import { UpdateCertificationDto } from '../dto/update-certification.dto';

export interface ICertificationService {
  create(newCertification: NewCertificationDto): Promise<Certification>;
  update(certificationId: number, updateCertification: UpdateCertificationDto, profileId: number): Promise<Certification | null>;
  delete(certificationId: number, profileId: number): Promise<void>;
}
