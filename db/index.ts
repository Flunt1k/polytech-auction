import fs from 'fs';
import mysql from 'mysql2';
import SECRETS from '../secrets';

export const initDataBase = async () => {
    const connection = mysql.createConnection({
        host: SECRETS.DB_HOSTNAME,
        port: SECRETS.DB_PORT,
        user: SECRETS.DB_USER,
        password: SECRETS.DB_PASSWORD,
        database: SECRETS.DB_NAME,
        ssl: {
            ca: fs.readFileSync(SECRETS.SERT_PATH) as unknown as string,
        },
    });
    await connection.connect();
};
