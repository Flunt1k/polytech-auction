import {GlobalState} from '../store';

export const selectToken = (state: GlobalState) => state.user.token;
