import React from 'react';
import {Box, Flex} from '@chakra-ui/react';
import {Navigation} from '../../components/Navigation/Navigation';

export const App = () => {
    return (
        <Flex height="100vh" width="100vw" overflow="hidden">
            <Box height="100vh" flex="0 0 auto">
                <Navigation />
            </Box>
            <Box height="100vh" flex="1"></Box>
        </Flex>
    );
};
