import http from 'http';
import app from './app';
import SECRETS from './secrets';
import sequelize from './db';

const server = http.createServer(app);

server.listen(SECRETS.SERVER_PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    console.log(`Server has been started and listen port: ${SECRETS.SERVER_PORT}`);
});
