import React from 'react';
import {Box, Center, Divider, Flex, Grid, Heading, Spinner} from '@chakra-ui/react';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from '../../redux/user/selectors';
import {selectProducts} from '../../redux/products/selectors';
import {AppDispatch} from '../../redux/store';
import {getProductsBySellerId} from '../../redux/products/actions';
import {getOrdersByCustomerId} from '../../redux/orders/actions';
import {selectOrders} from '../../redux/orders/selectors';
import {Card} from './components/Card';

const HomePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector(selectProducts);
    const orders = useSelector(selectOrders);
    const user = useSelector(selectUser);
    const [isLoading, setIsLoading] = React.useState(false);

    const userType = user?.type;

    const isSeller = userType === 'seller';
    const isCustomer = userType === 'customer';

    React.useEffect(() => {
        async function load() {
            setIsLoading(true);
            if (isSeller) {
                await dispatch(getProductsBySellerId());
            } else if (isCustomer) {
                await dispatch(getOrdersByCustomerId());
            }
            setIsLoading(false);
        }

        load();
    }, []);

    if (!user) {
        return null;
    }

    if (isLoading) {
        return (
            <Center width="100%" height="100%">
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

    return (
        <React.Fragment>
            <Flex w="100%">
                <Box w="100%">
                    <Flex flexDirection="column" width="100%">
                        <Heading>Станица пользователя {user.username}</Heading>
                        <Heading size="lg">Ваш баланс {user.cash} рублей</Heading>
                    </Flex>
                </Box>
            </Flex>
            <Divider margin={'15px 0 '} backgroundColor={'white'} />
            <Heading size="lg">Заказы</Heading>
            {isSeller && (
                <Grid templateColumns={'repeat(5, auto)'}>
                    {products.map(({id, productName, initialPrice, buyInPrice, deadline}) => {
                        return (
                            <Card
                                key={id}
                                title={productName}
                                price={buyInPrice}
                                price2={initialPrice}
                                datetime={deadline}
                                id={id}
                            />
                        );
                    })}
                </Grid>
            )}
        </React.Fragment>
    );
};

export default HomePage;
