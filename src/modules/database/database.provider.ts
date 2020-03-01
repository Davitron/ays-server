import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from '../../shared/database/database';
import { models } from './models';

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
      sequelize.addModels([...models]);
      // await sequelize.sync();
      return sequelize;
    },
  },
];
