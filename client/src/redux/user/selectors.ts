import {GlobalState} from '../store';

export const selectToken = (state: GlobalState) => state.user.token;
export const selectUser = (state: GlobalState) => state.user.user;
