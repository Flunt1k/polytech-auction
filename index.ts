import http from 'http';
import app from './app';
import SECRETS from './secrets';
import {initDataBase} from './db';

const server = http.createServer(app);

server.listen(SECRETS.SERVER_PORT, async () => {
    await initDataBase();
    console.log(`Server has been started and listen port: ${SECRETS.SERVER_PORT}`);
});
