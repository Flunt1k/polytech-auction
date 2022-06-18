import {GlobalState} from '../store';

export const selectOrders = (state: GlobalState) => state.orders.orders;
