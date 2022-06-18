import {AnyAction, applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {userReducer} from './user/reducer';
import {Customer, Product, Seller} from '../types';
import {productsReducer} from './products/reducer';
import {decodeJwt} from '../utils/jwt';

export type GlobalState = {
    user: {
        token: string;
        user: Customer | Seller;
    };
    products: {
        products: Product[];
    };
};

export type AppDispatch = ThunkDispatch<GlobalState, any, AnyAction>;

const composeEnhancers =
    (typeof window !== 'undefined' &&
        // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const rootReducer = combineReducers({user: userReducer, products: productsReducer});

const checkTokenExpirationMiddleware = (store: any) => (next: any) => (action: any) => {
    const token = localStorage.getItem('token') || '';
    console.log(decodeJwt(token));
    if (token && decodeJwt(token).exp < Date.now() / 1000) {
        next(action);
        localStorage.removeItem('token');
    }

    next(action);
};

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...[thunk, checkTokenExpirationMiddleware])),
);

store.subscribe(() => {
    localStorage.setItem('token', store.getState().user.token || '');
});
