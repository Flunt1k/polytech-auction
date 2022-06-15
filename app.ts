import express from 'express';
import routes from './routes';
import {CustomerController} from './controllers/CustomerController';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('*', (req, _res, next) => {
    console.log(req.body);
    next();
});

routes(app, [
    {
        path: 'customer',
        subPaths: {
            create: ['post', '/'],
            update: ['patch', '/'],
            delete: ['delete', '/'],
            getById: ['get', '/?:customerId'],
        },
        Controller: CustomerController,
    },
]);

export default app;
