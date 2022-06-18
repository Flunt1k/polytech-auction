import React from 'react';
import {Center, Grid, Spinner} from '@chakra-ui/react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {selectProducts} from '../../redux/products/selectors';
import {fetchAllProducts} from '../../redux/products/actions';
import {ProductCard} from '../../components/ProductCard/ProductCard';
import {Product} from '../../types';

const GalleryPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector(selectProducts);

    React.useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    if (!products.length) {
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
