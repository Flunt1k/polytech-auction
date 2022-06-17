import React from 'react';
import {Box, Flex} from '@chakra-ui/react';
import {FaHome} from 'react-icons/fa';
import {MdSell} from 'react-icons/md';
import {AsideMenuConfig, Navigation} from '../../components/Navigation/Navigation';
import AuthPage from '../../pages/auth';

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
    return (
        <Flex height="100vh" width="100vw" overflow="hidden">
            <AuthPage />
        </Flex>
    );
};
