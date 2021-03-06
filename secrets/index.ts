import dotenv from 'dotenv';

dotenv.config();

type ServerAppSecrets = {
    DB_HOSTNAME: string;
    DB_PASSWORD: string;
    DB_PORT: number;
    DB_USER: string;
    DB_NAME: string;
    SERT_PATH: string;
    SERVER_PORT: number | string;
    SALT: number;
    JWT_SECRET: string | number | Buffer;
};

const SECRETS: ServerAppSecrets = {
    DB_HOSTNAME: process.env.DB_HOSTNAME || '',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3001,
    DB_USER: process.env.DB_USER || '',
    DB_NAME: process.env.DB_NAME || '',
    SERT_PATH: process.env.SERT_PATH || '',
    SERVER_PORT: process.env.SERVER_PORT || 3000,
    SALT: process.env.SALT ? Number(process.env.SALT) : 10,
    JWT_SECRET: process.env.JWT_SECRET || '10',
};

export default SECRETS;
