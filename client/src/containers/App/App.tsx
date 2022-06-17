import React from 'react';
import {Box, Flex} from '@chakra-ui/react';
import {FaHome} from 'react-icons/fa';
import {MdSell} from 'react-icons/md';
import {AsideMenuConfig, Navigation} from '../../components/Navigation/Navigation';
// import {ProductCard} from '../../components/ProductCard/ProductCard';
import {useDispatch} from 'react-redux';
import {fetchAllProducts} from '../../redux/products/actions';
import {AppDispatch} from '../../redux/store';

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

    React.useEffect(() => {
        async function fetch() {
            await dispatch(fetchAllProducts());
        }

        fetch();
    }, [dispatch]);

    return (
        <Flex height="100vh" width="100vw" overflow="hidden">
            <Box height="100vh" flex="0 0 auto">
                <Navigation config={ASIDE_MENU_BUTTONS} />
            </Box>
            <Box height="100vh" flex="1">
                {/*<ProductCard*/}
                {/*    id={image.id}*/}
                {/*    title={image.productName}*/}
                {/*    // @ts-ignore*/}
                {/*    image={image.image.data.toString('base64')}*/}
                {/*    year={image.year}*/}
                {/*    initialPrice={image.initialPrice}*/}
                {/*    deadline={image.deadline}*/}
                {/*/>*/}
            </Box>
        </Flex>
    );
};
