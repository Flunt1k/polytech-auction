import React from 'react';
import {Box, Center, Flex, Spinner} from '@chakra-ui/react';
import {FaHome} from 'react-icons/fa';
import {MdSell, MdAddBox} from 'react-icons/md';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import {AsideMenuConfig, Navigation} from '../../components/Navigation/Navigation';
import {useDispatch, useSelector} from 'react-redux';
import {decodeJwt} from '../../utils/jwt';

import AuthPage from '../../pages/auth';
import RegPage from '../../pages/reg';
import GalleryPage from '../../pages/gallery';
import ProductPage from '../../pages/product';
import HomePage from '../../pages/home';
import {selectToken, selectUser} from '../../redux/user/selectors';
import {fetchUser} from '../../redux/user/actions';
import {AppDispatch} from '../../redux/store';
import {CreateProductModal} from '../../components/Modal/CreateProductModal';

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

    if (token && (location.pathname === '/login' || location.pathname === '/registration')) {
        return <Navigate to="/" state={{from: location}} replace />;
    }

    return children;
};

const NotRequireAuth = ({children}: {children: JSX.Element}) => {
    const token = useSelector(selectToken);
    let location = useLocation();

    if (token && (location.pathname === '/login' || location.pathname === '/registration')) {
        return <Navigate to="/" state={{from: location}} replace />;
    }

    return children;
};

export const App = () => {
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector(selectUser);
    const token = useSelector(selectToken);

    const [isOpen, setIsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        async function load() {
            if (token) {
                const decodedToken = decodeJwt(token);
                if (decodedToken.type) {
                    const args: any = {};
                    if (decodedToken.type === 'customer') {
                        args.customerId = decodedToken.id;
                    } else {
                        args.sellerId = decodedToken.id;
                    }
                    setIsLoading(true);
                    await dispatch(fetchUser(args, decodedToken.type));
                    setIsLoading(false);
                }
            }
        }

        load();
    }, [dispatch, token]);

    const menuButtons = React.useMemo(() => {
        const arr = [...ASIDE_MENU_BUTTONS];

        if (user?.type === 'seller') {
            arr.push({
                openText: 'Создать предложение',
                icon: MdAddBox,
                aria: 'create-order',
                onClick: () => {
                    setIsOpen(true);
                },
            });
        }

        return arr;
    }, [user?.type]);

    if (isLoading) {
        return (
            <Center height="100vh" width="100vw">
                <Spinner
                    thickness="4px"
                    speed="0.75s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
            </Center>
        );
    }

    // @ts-ignore
    return (
        <React.Fragment>
            <Flex height="100vh" width="100vw" overflow="hidden">
                <Box height="100vh" flex="0 0 auto">
                    <Navigation config={menuButtons} />
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
                            path="/product/:id"
                            element={
                                <RequireAuth>
                                    <ProductPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <NotRequireAuth>
                                    <AuthPage />
                                </NotRequireAuth>
                            }
                        />
                        <Route
                            path="/registration"
                            element={
                                <NotRequireAuth>
                                    <RegPage />
                                </NotRequireAuth>
                            }
                        />
                    </Routes>
                </Box>
            </Flex>
            <CreateProductModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </React.Fragment>
    );
};
