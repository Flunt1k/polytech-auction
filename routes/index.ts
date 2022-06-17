import express, {Express, Request, Response, NextFunction} from 'express';
import passport from 'passport';
import {RouterMap} from '../types/misc';
import {BaseController} from '../controllers';

type RoutesConfig = {
    path: string;
    subPaths: RouterMap;
    Controller: typeof BaseController;
};

export default function (app: Express, args: RoutesConfig[]) {
    args.forEach(({path, subPaths, Controller}) => {
        // eslint-disable-next-line new-cap
        const router = express.Router();
        const controller = new Controller(subPaths);

        const controllerSettings = controller.init();

        controllerSettings.forEach((settings) => {
            const isIgnoreJwt =
                (path === 'customer' || path === 'seller') && settings.methodName === 'create';

            const middleware = isIgnoreJwt
                ? (_req: Request, _res: Response, next: NextFunction) => {
                      next();
                  }
                : passport.authenticate('jwt', {session: false});

            router[settings.handlerType](settings.path, middleware, (req, res, next) => {
                settings.method(req, res).catch((err: any) => {
                    next(err);
                });
            });
        });

        app.use(`/api/${path}`, router);
    });
}
