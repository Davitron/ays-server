import { Job } from '../entities/job.entity';

export const jobProvider = {
    provide: 'JobRepository',
    useValue: Job,
};
