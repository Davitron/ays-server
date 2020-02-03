import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from '../../shared';

export const databaseProvider = [
  {
    provide: 'SEQUELIZE',
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
      // await sequelize.sync();
      return sequelize;
    },
  },
];
