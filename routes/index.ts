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
            router[settings.handlerType](settings.path, (req, res) => {
                try {
                    settings.method(req, res);
                    res.end();
                } catch (err: any) {
                    res.status(500).json({
                        message: 'Internal server error',
                        code: 500,
                        debug: {err},
                    });
                }
            });
        });

        app.use(`/api/${path}`, router);
    });
}
