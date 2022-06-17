import {Customer, Seller} from '../../types';
import {SET_TOKEN, SET_USER, UserActions} from './actions';

type UserState = {
    token?: string;
    user?: Customer | Seller;
};

const initialState: UserState = {
    token: undefined,
    user: undefined,
};

export const userReducer = (state: UserState = initialState, action: UserActions): UserState => {
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.payload};
        case SET_TOKEN:
            return {...state, token: action.payload};
        default:
            return state;
    }
};
