import dotenv from 'dotenv';

dotenv.config();

type ServerAppSecrets = {
    DB_HOSTNAME: string;
    DB_PASSWORD: string;
    DB_PATH: string;
    SERVER_PORT: number | string;
};

const SECRETS: ServerAppSecrets = {
    DB_HOSTNAME: process.env.DB_HOSTNAME || '',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_PATH: process.env.DB_PATH || '',
    SERVER_PORT: process.env.SERVER_PORT || 3000,
};

export default SECRETS;
