import {Product, ProductCreateArgs, ProductGetArgs} from '../../types';
import api from '../../api';
import {AppDispatch, GlobalState} from '../store';

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
    return async (dispatch: AppDispatch, getState: () => GlobalState) => {
        const state = getState();
        const token = state.user.token;
        const products = (await api.product.getProduct({}, token)) as {products: Product[]};
        dispatch(setProducts(products.products));
    };
};

export const createProduct = (args: ProductCreateArgs) => {
    return async (dispatch: AppDispatch, getState: () => GlobalState): Promise<string> => {
        const token = getState().user.token;
        const response = await api.product.createProduct(args, token);

        return response.product.id;
    };
};

export const getProductsBySellerId = () => {
    return async (dispatch: AppDispatch, getState: () => GlobalState) => {
        const state = getState();
        const token = state.user.token;
        const user = state.user.user;
        const products = (await api.product.getProduct({sellerId: user.id}, token)) as {
            products: Product[];
        };

        dispatch(setProducts(products.products));
    };
};

export type ProductActions = SetProductsAction;
