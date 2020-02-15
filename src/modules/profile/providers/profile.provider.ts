import { Profile } from '../entities/profile.entity';

export const profilesProvider = {
    provide: 'ProfileRepository',
    useValue: Profile,
};
