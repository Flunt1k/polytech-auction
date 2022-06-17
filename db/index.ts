import fs from 'fs';
import path from 'path';
import {Sequelize} from 'sequelize-typescript';
import mySQLModule from 'mysql2';
import SECRETS from '../secrets';

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
    models: [path.resolve(__dirname, 'models')],
    query: {raw: true},
});

export default sequelize;
