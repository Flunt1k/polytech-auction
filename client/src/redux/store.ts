import {AnyAction, applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {userReducer} from './user/reducer';
import {Customer, Product, Seller} from '../types';
import {productsReducer} from './products/reducer';

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

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

store.subscribe(() => {
    localStorage.setItem('token', store.getState().user.token || '');
});
