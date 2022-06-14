import fs from 'fs';
import {Sequelize} from 'sequelize';
import mySQLModule from 'mysql2';
import SECRETS from '../secrets';

export const initDataBase = async () => {
    const sequelize = new Sequelize({
        dialect: 'mysql',
        dialectModule: mySQLModule,
        dialectOptions: {
            ssl: {
                ca: fs.readFileSync(SECRETS.SERT_PATH) as unknown as string,
            },
        },
        host: SECRETS.DB_HOSTNAME,
        port: SECRETS.DB_PORT,
        database: SECRETS.DB_NAME,
        username: SECRETS.DB_USER,
        password: SECRETS.DB_PASSWORD,
    });

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    return sequelize;
};
