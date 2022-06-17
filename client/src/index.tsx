import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import {Provider} from 'react-redux';
import {App} from './containers/App/App';
import {store} from './redux/store';

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
};

const theme = extendTheme({config});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <ChakraProvider theme={theme}>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </ChakraProvider>,
);
