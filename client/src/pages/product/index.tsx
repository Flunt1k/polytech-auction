import React from 'react';
import {Box, Button, Center, Divider, Flex, Grid, Heading, Image} from '@chakra-ui/react';
import {Order, Product} from '../../types';
import api from '../../api';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectToken, selectUser} from '../../redux/user/selectors';
import moment from 'moment';
import {Card} from '../home/components/Card';
import {CreateOrderModal} from '../../components/Modal/CreateOrderModal';

const ProductPage = () => {
    const {id} = useParams();
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);
    const [product, setProduct] = React.useState<Product | null>(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isBuyIn, setIsBuyIn] = React.useState(false);

    React.useEffect(() => {
        async function load() {
            const product = (await api.product.getProduct({productId: id}, token)) as {
                product: Product;
            };

            setProduct(product.product);
        }

        load();
    }, [token, id]);

    if (!product) {
        return null;
    }

    const orders = Array.isArray(product.order) ? product.order : ([product.order] as Order[]);

    const isBuyInAvailable = orders?.every((o) => !o.isBuyIn);

    const minBet =
        orders.length && orders[0].id !== null
            ? orders.reduce((p, c) => (p.bet > c.bet ? p : c)).bet
            : product.initialPrice;

    console.log(user.phone);

    return (
        <Flex height="100%" width="100%" flexDirection="column">
            <Heading>Страница с товаром</Heading>
            <Heading size="lg">Название: {product.productName}</Heading>
            <Heading size="lg">Продавец: {user.username}</Heading>
            <Center>
                <Image
                    width="480px"
                    height="auto"
                    src={`data:image/png;base64,${product.image}`}
                    border="1px solid white"
                    borderRadius="lg"
                    margin="30px"
                />
            </Center>
            <Divider backgroundColor="white" />

            {isBuyInAvailable ? (
                <React.Fragment>
                    {user.type !== 'seller' && (
                        <React.Fragment>
                            {product.initialPrice && (
                                <Flex fontSize="24px" margin="45px 15px">
                                    <Center>
                                        Изначальная цена для торгов:{' '}
                                        <Box>{product.initialPrice} /руб</Box>
                                        <Button
                                            marginLeft="25px"
                                            backgroundColor="forestgreen"
                                            onClick={() => {
                                                setIsBuyIn(false);
                                                setIsOpen(true);
                                            }}
                                        >
                                            Сделать ставку
                                        </Button>
                                    </Center>
                                </Flex>
                            )}
                            {product.buyInPrice && (
                                <Flex>
                                    <Center>
                                        Цена выкупа товара: <Box>{product.buyInPrice} /руб</Box>
                                        <Button
                                            marginLeft="25px"
                                            backgroundColor="forestgreen"
                                            onClick={() => {
                                                setIsBuyIn(true);
                                                setIsOpen(true);
                                            }}
                                        >
                                            Выкупить
                                        </Button>
                                    </Center>
                                </Flex>
                            )}
                        </React.Fragment>
                    )}
                    <Box fontSize="32px">
                        Дата окончания: {moment(product.deadline).format('DD.MM.YYYY hh:mm:ss')}
                    </Box>
                    <Divider backgroundColor="white" />
                    <Grid>
                        {orders?.length && orders[0].id !== null && (
                            <Heading size="lg">Заказы</Heading>
                        )}
                        {orders?.map((order) => {
                            if (order.id === null) {
                                return null;
                            }
                            return (
                                <Card
                                    key={order.id}
                                    author={order.customer?.username}
                                    bet={order.bet}
                                    isBuyIn={order.isBuyIn}
                                />
                            );
                        })}
                    </Grid>
                </React.Fragment>
            ) : (
                <Heading color="red" size="lg">
                    Товар выкуплен
                </Heading>
            )}
            {isOpen && (
                <CreateOrderModal
                    isOpen={isOpen}
                    isBuyIn={isBuyIn}
                    onClose={() => setIsOpen(false)}
                    email={user.email}
                    phone={user.phone}
                    productId={id || product.id}
                    sellerId={product.ownerId}
                    customerId={user.id}
                    minBet={isBuyIn ? product.buyInPrice! : minBet}
                    token={token}
                />
            )}
        </Flex>
    );
};

export default ProductPage;
