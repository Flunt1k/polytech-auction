import {StringMap} from '../types/misc';

export class BaseController {
    paths: StringMap;
    constructor(paths: StringMap) {
        this.paths = paths;
    }

    init(): {method: string; path: string}[] {
        return Object.getOwnPropertyNames(this).map((v) => {
            return {
                method: v,
                path: this.paths[v],
            };
        });
    }
}
