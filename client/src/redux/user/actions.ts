import {Customer, Seller} from '../../types';

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

export type UserActions = SetTokenAction | SetUserAction;
