import http from 'http';
import app from './app';
import SECRETS from './secrets';

const server = http.createServer(app);

server.listen(SECRETS.SERVER_PORT, () => {
    console.log(`Server has been started and listen port: ${SECRETS.SERVER_PORT}`);
});
