import {
    SellerCreateArgs,
    SellerCreateResponse,
    SellerDeleteArgs,
    SellerDeleteResponse,
    SellerGetArgs,
    SellerGetResponse,
    SellerUpdateArgs,
    SellerUpdateResponse,
} from '../types';
import {appFetch, createQuery} from './fetch';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getSeller: async (args: SellerGetArgs, token: string): Promise<SellerGetResponse> => {
        try {
            return await appFetch({
                path: '/api/seller',
                method: 'get',
                token,
                query: createQuery(args),
            });
        } catch (err: any) {
            throw new Error(err);
        }
    },
    createSeller: async (args: SellerCreateArgs): Promise<SellerCreateResponse> => {
        try {
            return await appFetch({
                path: '/api/seller',
                method: 'post',
                data: args,
            });
        } catch (err: any) {
            throw new Error(err);
        }
    },
    updateSeller: async (args: SellerUpdateArgs, token: string): Promise<SellerUpdateResponse> => {
        try {
            return await appFetch({
                path: '/api/seller',
                method: 'patch',
                data: args,
                token,
            });
        } catch (err: any) {
            throw new Error(err);
        }
    },
    deleteSeller: async (args: SellerDeleteArgs, token: string): Promise<SellerDeleteResponse> => {
        try {
            return await appFetch({
                path: '/api/seller',
                method: 'delete',
                data: args,
                token,
            });
        } catch (err: any) {
            throw new Error(err);
        }
    },
};
