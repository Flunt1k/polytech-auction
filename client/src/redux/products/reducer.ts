import {Product} from '../../types';
import {ProductActions, SET_PRODUCTS} from './actions';

type ProductState = {
    products: Product[];
};

const initialState: ProductState = {
    products: [],
};

export const productsReducer = (
    state: ProductState = initialState,
    action: ProductActions,
): ProductState => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };
        default:
            return state;
    }
};
