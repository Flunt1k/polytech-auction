import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {userReducer} from './user/reducer';

const composeEnhancers =
    (typeof window !== 'undefined' &&
        // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const rootReducer = combineReducers({user: userReducer});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
