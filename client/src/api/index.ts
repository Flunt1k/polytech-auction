// eslint-disable-next-line import/no-anonymous-default-export
import customer from './customer';
import seller from './seller';
import product from './product';
import order from './order';
import {appFetch} from './fetch';
import {Customer, Seller} from '../types';

const login = async (args: {
    email: string;
    password: string;
}): Promise<
    | {user: Customer | Seller; token: string}
    | {message?: string; user?: Customer | Seller; err?: any; info?: any}
> => {
    const response = await appFetch({path: '/login', data: args, method: 'post'});

    console.log(response);

    return response;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    customer: {...customer, login},
    seller: {...seller, login},
    product,
    order,
};
