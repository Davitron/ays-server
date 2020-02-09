import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from '../../shared/database/database';
import { User } from '../users/user.entity';
import { Profile } from '../profile/entities/profile.entity';
import { Education } from '../profile/entities/education.entity';
import { WorkExperience } from '../profile/entities/work-experience.entity';
import { Certification } from '../profile/entities/certification.entity';

export const databaseProvider = [
  {
    provide: 'SequelizeInstance',
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case 'production':
            config = databaseConfig.production;
        case 'development':
            config = databaseConfig.development;
        default:
            config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Profile, Education, WorkExperience, Certification]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
