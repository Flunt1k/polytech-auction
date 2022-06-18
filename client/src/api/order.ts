import {
    OrderCreateArgs,
    OrderCreateResponse,
    OrderDeleteArgs,
    OrderDeleteResponse,
    OrderGetArgs,
    OrderGetResponse,
    OrderUpdateArgs,
    OrderUpdateResponse,
} from '../types';
import {appFetch, createQuery} from './fetch';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getOrder: async (args: OrderGetArgs, token: string): Promise<OrderGetResponse> => {
        try {
            return await appFetch({
                path: '/api/order',
                method: 'get',
                token,
                query: createQuery(args),
            });
        } catch (err: any) {
            throw new Error(err);
        }
    },
    createOrder: async (args: OrderCreateArgs, token: string): Promise<OrderCreateResponse> => {
        try {
            return await appFetch({
                path: '/api/order',
                method: 'post',
                data: args,
                token,
            });
        } catch (err: any) {
            throw new Error(err);
        }
    },
    updateOrder: async (args: OrderUpdateArgs, token: string): Promise<OrderUpdateResponse> => {
        try {
            return await appFetch({
                path: '/api/order',
                method: 'patch',
                data: args,
                token,
            });
        } catch (err: any) {
            throw new Error(err);
        }
    },
    deleteOrder: async (args: OrderDeleteArgs, token: string): Promise<OrderDeleteResponse> => {
        try {
            return await appFetch({
                path: '/api/order',
                method: 'delete',
                data: args,
                token,
            });
        } catch (err: any) {
            throw new Error(err);
        }
    },
};
