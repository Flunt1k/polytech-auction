import {OrdersActions, SET_ORDERS} from './actions';
import {Order} from '../../types';

type InitialState = {
    orders: Order[];
};

const initialState: InitialState = {
    orders: [],
};

export const ordersReducer = (
    state: InitialState = initialState,
    action: OrdersActions,
): InitialState => {
    switch (action.type) {
        case SET_ORDERS:
            return {...state, orders: action.payload};
        default:
            return state;
    }
};
