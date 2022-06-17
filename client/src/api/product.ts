import {
    ProductCreateArgs,
    ProductCreateResponse,
    ProductDeleteArgs,
    ProductDeleteResponse,
    ProductGetArgs,
    ProductGetResponse,
    ProductUpdateArgs,
    ProductUpdateResponse,
} from '../types';
import {appFetch, createQuery} from './fetch';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getProduct: async (args: ProductGetArgs, token: string): Promise<ProductGetResponse> => {
        try {
            return await appFetch({
                path: '/api/product',
                method: 'get',
                token,
                query: createQuery(args),
            });
        } catch (err: any) {
            throw new Error(err);
        }
    },
    createProduct: async (args: ProductCreateArgs): Promise<ProductCreateResponse> => {
        try {
            return await appFetch({
                path: '/api/product',
                method: 'post',
                data: args,
            });
        } catch (err: any) {
            throw new Error(err);
        }
    },
    updateProduct: async (
        args: ProductUpdateArgs,
        token: string,
    ): Promise<ProductUpdateResponse> => {
        try {
            return await appFetch({
                path: '/api/product',
                method: 'patch',
                data: args,
                token,
            });
        } catch (err: any) {
            throw new Error(err);
        }
    },
    deleteProduct: async (
        args: ProductDeleteArgs,
        token: string,
    ): Promise<ProductDeleteResponse> => {
        try {
            return await appFetch({
                path: '/api/product',
                method: 'delete',
                data: args,
                token,
            });
        } catch (err: any) {
            throw new Error(err);
        }
    },
};
