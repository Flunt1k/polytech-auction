import React from 'react';
import {Box, Button, Divider, Flex, Grid, Heading, Image} from '@chakra-ui/react';
import {Order, Product} from '../../types';
import api from '../../api';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectToken} from '../../redux/user/selectors';
import moment from 'moment';
import {Card} from '../home/components/Card';

const ProductPage = () => {
    const {id} = useParams();
    const token = useSelector(selectToken);
    const [product, setProduct] = React.useState<Product | null>(null);

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

    return (
        <Flex height="100%" width="100%" flexDirection="column">
            <Heading>Страница с товаром</Heading>
            <Heading size="lg">Название: {product.productName}</Heading>
            <Image
                src={`data:image/png;base64,${product.image}`}
                border="1px solid black"
                borderRadius="lg"
                margin="30px"
            />
            <Divider backgroundColor="white" />

            {isBuyInAvailable ? (
                <React.Fragment>
                    {product.initialPrice && (
                        <Flex fontSize="24px" margin="45px 15px">
                            <Box>{product.initialPrice} /руб</Box>
                            <Button marginLeft="25px" backgroundColor="forestgreen">
                                Сделать стаку
                            </Button>
                        </Flex>
                    )}
                    {product.buyInPrice && (
                        <Flex>
                            <Box>{product.buyInPrice} /руб</Box>
                            <Button marginLeft="25px" backgroundColor="forestgreen">
                                Выкупить
                            </Button>
                        </Flex>
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
        </Flex>
    );
};

export default ProductPage;
