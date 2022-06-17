import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box, Flex} from '@chakra-ui/react';
import {FaHome} from 'react-icons/fa';
import {MdSell} from 'react-icons/md';
import {Routes, Route, Link} from 'react-router-dom';
import {AsideMenuConfig, Navigation} from '../../components/Navigation/Navigation';
import {fetchAllProducts} from '../../redux/products/actions';
import {AppDispatch} from '../../redux/store';
import {selectProducts} from '../../redux/products/selectors';
import {ProductCard} from '../../components/ProductCard/ProductCard';

import AuthPage from '../../pages/auth';
import RegPage from '../../pages/reg';
import GalleryPage from '../../pages/gallery';
import ProductPage from '../../pages/product';
import HomePage from '../../pages/home';

const ASIDE_MENU_BUTTONS: AsideMenuConfig[] = [
    {
        openText: 'Домашняя страница',
        icon: FaHome,
        aria: 'home-page',
    },
    {
        openText: 'Каталог товаров',
        icon: MdSell,
        aria: 'sell-page',
    },
];

export const App = () => {
    const dispatch: AppDispatch = useDispatch();
    const products = useSelector(selectProducts);

    React.useEffect(() => {
        async function fetch() {
            await dispatch(fetchAllProducts());
        }

        fetch();
    }, [dispatch]);

    return (
        <Flex height="100vh" width="100vw" overflow="hidden">
            <Box height="100vh" flex="0 0 auto">
                <Input />
                <Navigation config={ASIDE_MENU_BUTTONS} />
            </Box>
            <Box height="100vh" flex="1" overflow="auto">
                {new Array(12).fill(products[0]).map((product) => {
                    return (
                        <ProductCard
                            key={product.id + Math.random()}
                            id={product.id}
                            title={product.productName}
                            image={product.image}
                            year={product.year}
                            initialPrice={product.initialPrice}
                            deadline={product.deadline}
                        />
                    );
                })}
            </Box>
        </Flex>
        <Routes>
            <Route path='/' element={<HomePage />} />
        <Routes/>
        
    );
};
