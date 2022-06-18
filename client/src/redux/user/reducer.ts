import {Customer, Seller} from '../../types';
import {SET_TOKEN, SET_USER, UserActions} from './actions';
import {isTokenExists} from '../../utils/jwt';

type UserState = {
    token?: string;
    user?: Customer | Seller;
};

let isTokenValid;
let token;

try {
    token = localStorage.getItem('token') || '';
    isTokenValid = Boolean(token && isTokenExists(token));
    token = isTokenValid ? token : undefined;
} catch (_err) {
    isTokenValid = false;
}

if (!isTokenValid) {
    localStorage.removeItem('token');
}

const initialState: UserState = {
    token: token,
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
