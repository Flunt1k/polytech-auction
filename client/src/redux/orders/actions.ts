import {Order} from '../../types';
import {AppDispatch, GlobalState} from '../store';
import api from '../../api';

export const SET_ORDERS = Symbol('SET_ORDERS');

export type SetOrdersAction = {
    type: typeof SET_ORDERS;
    payload: Order[];
};

export const setOrders = (orders: Order[]): SetOrdersAction => ({
    type: SET_ORDERS,
    payload: orders,
});

export const getOrdersByCustomerId = () => {
    return async (dispatch: AppDispatch, getState: () => GlobalState) => {
        const state = getState();
        const token = state.user.token;
        const user = state.user.user;

        const orders = (await api.order.getOrder(
            {customerIdAll: user.id, includeProduct: true},
            token,
        )) as {
            orders: Order[];
        };

        dispatch(setOrders(orders.orders));
    };
};

export type OrdersActions = SetOrdersAction;
