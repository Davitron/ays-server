import { WorkExperience } from '../entities/work-experience.entity';

export const workProvider = {
    provide: 'WorkExperienceRepository',
    useValue: WorkExperience,
};
