import {RouterMap} from '../types/misc';
import express, {Express} from 'express';
import {CustomerController} from '../controllers/CustomerController';

type RoutesConfig = {
    path: string;
    subPaths: RouterMap;
    Controller: typeof CustomerController;
};

export default function (app: Express, args: RoutesConfig[]) {
    args.forEach(({path, subPaths, Controller}) => {
        // eslint-disable-next-line new-cap
        const router = express.Router();
        const controller = new Controller(subPaths);

        const controllerSettings = controller.init();

        controllerSettings.forEach((settings) => {
            router[settings.handlerType](settings.path, (req, res, next) => {
                settings.method(req, res).catch((err: any) => {
                    next(err);
                });
            });
        });

        app.use(`/api/${path}`, router);
    });
}
