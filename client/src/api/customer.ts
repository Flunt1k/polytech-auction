import {
    CustomerCreateArgs,
    CustomerCreateResponse,
    CustomerDeleteArgs,
    CustomerDeleteResponse,
    CustomerGetArgs,
    CustomerGetResponse,
    CustomerUpdateArgs,
    CustomerUpdateResponse,
} from '../types';
import {appFetch, createQuery} from './fetch';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getCustomer: async (args: CustomerGetArgs, token: string): Promise<CustomerGetResponse> => {
        try {
            return await appFetch({
                path: '/api/customer',
                method: 'get',
                token,
                query: createQuery(args),
            });
        } catch (err: any) {
            throw new Error(err);
        }
    },
    createCustomer: async (args: CustomerCreateArgs): Promise<CustomerCreateResponse> => {
        try {
            return await appFetch({
                path: '/api/customer',
                method: 'post',
                data: args,
            });
        } catch (err: any) {
            throw new Error(err);
        }
    },
    updateCustomer: async (
        args: CustomerUpdateArgs,
        token: string,
    ): Promise<CustomerUpdateResponse> => {
        try {
            return await appFetch({
                path: '/api/customer',
                method: 'patch',
                data: args,
                token,
            });
        } catch (err: any) {
            throw new Error(err);
        }
    },
    deleteCustomer: async (
        args: CustomerDeleteArgs,
        token: string,
    ): Promise<CustomerDeleteResponse> => {
        try {
            return await appFetch({
                path: '/api/customer',
                method: 'delete',
                data: args,
                token,
            });
        } catch (err: any) {
            throw new Error(err);
        }
    },
};
