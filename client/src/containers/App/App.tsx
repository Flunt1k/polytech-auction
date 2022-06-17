import React from 'react';
import {Box, Flex} from '@chakra-ui/react';
import {FaHome} from 'react-icons/fa';
import {MdSell} from 'react-icons/md';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import {AsideMenuConfig, Navigation} from '../../components/Navigation/Navigation';
import {useSelector} from 'react-redux';
import {decodeJwt} from '../../utils/jwt';

import AuthPage from '../../pages/auth';
import RegPage from '../../pages/reg';
import GalleryPage from '../../pages/gallery';
import ProductPage from '../../pages/product';
import HomePage from '../../pages/home';
import {selectToken} from '../../redux/user/selectors';

const ASIDE_MENU_BUTTONS: AsideMenuConfig[] = [
    {
        openText: 'Домашняя страница',
        icon: FaHome,
        aria: 'home-page',
        path: '/',
    },
    {
        openText: 'Каталог товаров',
        icon: MdSell,
        aria: 'sell-page',
        path: '/products',
    },
];

const RequireAuth = ({children}: {children: JSX.Element}) => {
    const token = useSelector(selectToken);
    let location = useLocation();

    if (!token || decodeJwt(token).exp < Date.now() / 1000) {
        return <Navigate to="/login" state={{from: location}} replace />;
    }

    return children;
};

export const App = () => {
    return (
        <React.Fragment>
            <Flex height="100vh" width="100vw" overflow="hidden">
                <Box height="100vh" flex="0 0 auto">
                    <Navigation config={ASIDE_MENU_BUTTONS} />
                </Box>
                <Box height="100vh" width="100vw" flex="1" overflow="auto" padding="35px">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <RequireAuth>
                                    <HomePage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/products"
                            element={
                                <RequireAuth>
                                    <GalleryPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/products/:id"
                            element={
                                <RequireAuth>
                                    <ProductPage />
                                </RequireAuth>
                            }
                        />
                        <Route path="/login" element={<AuthPage />} />
                        <Route path="/registration" element={<RegPage />} />
                    </Routes>
                </Box>
            </Flex>
        </React.Fragment>
    );
};
