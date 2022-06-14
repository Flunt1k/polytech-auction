import {HandlerType, RouterMap} from '../types/misc';

export class BaseController {
    paths: RouterMap;
    constructor(paths: RouterMap) {
        this.paths = paths;
    }

    init = (): {method: any; path: string; handlerType: HandlerType}[] => {
        Object.getOwnPropertyNames(this);
        return Object.getOwnPropertyNames(this)
            .map((v) => {
                if (this.paths[v]) {
                    const pathSettings = this.paths[v];

                    return {
                        // @ts-ignore
                        method: this[v],
                        handlerType: pathSettings[0],
                        path: pathSettings[1],
                    };
                }
                return null;
            })
            .filter(Boolean) as {method: any; path: string; handlerType: HandlerType}[];
    };
}
