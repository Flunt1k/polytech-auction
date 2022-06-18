import {Customer, CustomerGetArgs, Seller, SellerGetArgs} from '../../types';
import {AppDispatch, GlobalState} from '../store';
import api from '../../api';

export const SET_TOKEN = Symbol('SET_TOKEN');
export const SET_USER = Symbol('SET_USER');

export type SetTokenAction = {
    type: typeof SET_TOKEN;
    payload: string;
};

export type SetUserAction = {
    type: typeof SET_USER;
    payload: Customer | Seller;
};

export const setToken = (token: string): SetTokenAction => ({
    type: SET_TOKEN,
    payload: token,
});

export const setUser = (user: Customer | Seller): SetUserAction => ({
    type: SET_USER,
    payload: user,
});

export const fetchUser = (args: SellerGetArgs | CustomerGetArgs, type: 'customer' | 'seller') => {
    return async (dispatch: AppDispatch, getState: () => GlobalState) => {
        try {
            const token = getState().user.token;
            let user: Customer | Seller;
            if (type === 'customer') {
                const response = (await api.customer.getCustomer(args, token)) as {
                    customer: Customer;
                };
                user = response?.customer;
            } else {
                const response = (await api.seller.getSeller(args, token)) as {seller: Seller};
                user = response?.seller;
            }
            dispatch(setUser(user));
        } catch (err) {
            console.log(err);
        }
    };
};

export type UserActions = SetTokenAction | SetUserAction;
