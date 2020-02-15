import { Certification } from '../entities/certification.entity';

export const certificationProvider = {
    provide: 'CertificationRepository',
    useValue: Certification,
};
