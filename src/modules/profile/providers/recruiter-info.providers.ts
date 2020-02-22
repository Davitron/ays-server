import { RecruiterInfo } from '../entities/recruiter-info.entity';

export const recruiterInfoProvider = {
    provide: 'RecuiterInfoRepository',
    useValue: RecruiterInfo,
};
