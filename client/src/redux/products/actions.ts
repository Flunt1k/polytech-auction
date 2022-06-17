import {Product} from '../../types';
import {Dispatch} from 'redux';
import api from '../../api';
import {GlobalState} from '../store';

export const SET_PRODUCTS = Symbol('SET_PRODUCTS');

export type SetProductsAction = {
    type: typeof SET_PRODUCTS;
    payload: Product[];
};

export const setProducts = (products: Product[]): SetProductsAction => ({
    type: SET_PRODUCTS,
    payload: products,
});

export const fetchAllProducts = () => {
    return async (dispatch: any, getState: () => GlobalState) => {
        const state = getState();
        const token = state.user.token;
        console.log(token);
        const products = await api.product.getProduct({}, token);
        console.log(products);
    };
};

export type ProductActions = SetProductsAction;
