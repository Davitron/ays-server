import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { IDatabaseConfig } from './interfaces/dbConfig.interface';

dotenv.config();

export const databaseConfig: IDatabaseConfig = {
    development: {
        username: process.env.DB_USER || '',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || '',
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT) || 5432,
        dialect: 'postgres',
        logging: false,
    },
    production: {
        use_env_variable: process.env.DATABASE_URL,
        dialect: 'postgres',
    },
};
