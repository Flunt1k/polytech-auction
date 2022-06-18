import express from 'express';
import passport from 'passport';
import routes from './routes';
import {CustomerController} from './controllers/CustomerController';
import {SellerController} from './controllers/SellerController';
import {OrderController} from './controllers/OrderController';
import {ProductController} from './controllers/ProductController';
import {Customer} from './db/models/Customer';
import {Seller} from './db/models/Seller';
import {generateJwtToken} from './utils/jwt';

import './utils/auth';
import path from 'path';

const app = express();

app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(express.json({limit: '50mb'}));

app.post('/login', function (req, res) {
    passport.authenticate(
        'local',
        {session: false},
        (err: string, user: Customer | Seller | null, info: any) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Произошла ошибка!',
                    user: user,
                    err: err,
                    info,
                });
            }

            req.login(user, {session: false}, (err: any) => {
                if (err) {
                    res.send(err);
                    return;
                }
                const token = generateJwtToken(user);
                // eslint-disable-next-line consistent-return
                return res.status(200).json({
                    data: {
                        user,
                        token,
                    },
                });
            });

            return null;
        },
    )(req, res);
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

if (process.env.MODE === 'production') {
    console.log(path.join(__dirname, 'client/build'));
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.use(express.static(path.join(__dirname, 'client/public')));
    app.use((req, res) => {
        console.log(req.path);
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
    });
}

export default app;
