import express from 'express';
import routes from './routes';
import {CustomerController} from './controllers/CustomerController';
import {SellerController} from './controllers/SellerController';
import {OrderController} from './controllers/OrderController';
import {ProductController} from './controllers/ProductController';

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
            getCustomer: ['get', '/'],
        },
        Controller: CustomerController,
    },
    {
        path: 'seller',
        subPaths: {
            create: ['post', '/'],
            update: ['patch', '/'],
            delete: ['delete', '/'],
            getSeller: ['get', '/'],
        },
        Controller: SellerController,
    },
    {
        path: 'order',
        subPaths: {
            create: ['post', '/'],
            update: ['patch', '/'],
            delete: ['delete', '/'],
            getOrder: ['get', '/'],
        },
        Controller: OrderController,
    },
    {
        path: 'product',
        subPaths: {
            create: ['post', '/'],
            update: ['patch', '/'],
            delete: ['delete', '/'],
            getProduct: ['get', '/'],
        },
        Controller: ProductController,
    },
]);

export default app;
