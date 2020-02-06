import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from '../../shared/database/database';
import { User } from '../users/user.entity';

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
      sequelize.addModels([User]);
      // await sequelize.sync();
      return sequelize;
    },
  },
];
