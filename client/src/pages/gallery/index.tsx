import React from 'react';
import {Center, Grid, Heading, Spinner} from '@chakra-ui/react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {selectProducts} from '../../redux/products/selectors';
import {fetchAllProducts} from '../../redux/products/actions';
import {ProductCard} from '../../components/ProductCard/ProductCard';
import {Product} from '../../types';

const GalleryPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector(selectProducts);

    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(true);
        async function load() {
            await dispatch(fetchAllProducts());
            setIsLoading(false);
        }

        load().catch(() => setIsLoading(false));
    }, [dispatch]);

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

    if (products.length === 0) {
        return (
            <Center width="100%" height="100%">
                <Heading color="red">Товаров для покупки нет</Heading>
            </Center>
        );
    }

    return (
        <Grid templateColumns="repeat(3, 1fr)" gap={10}>
            {products.map((product: Product) => {
                return (
                    <ProductCard
                        id={product.id}
                        title={product.productName}
                        image={product.image}
                        year={product.year}
                        initialPrice={product.initialPrice}
                        buyInPrice={product.buyInPrice}
                        deadline={product.deadline}
                    />
                );
            })}
        </Grid>
    );
};

export default GalleryPage;
