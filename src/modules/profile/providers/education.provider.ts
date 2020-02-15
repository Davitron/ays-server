import { Education } from '../entities/education.entity';

export const educationProvider = {
    provide: 'EducationRepository',
    useValue: Education,
};
