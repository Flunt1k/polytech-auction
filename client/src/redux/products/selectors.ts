import {GlobalState} from '../store';

export const selectProducts = (state: GlobalState) => state.products.products;
