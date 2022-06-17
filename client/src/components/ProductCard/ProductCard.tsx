import React from 'react';
import {Box, Image} from '@chakra-ui/react';
import moment from 'moment';

type Props = {
    id: string;
    title: string;
    image: string;
    year: string;
    buyInPrice?: number;
    initialPrice: number;
    deadline: string;
};

export const ProductCard: React.FC<Props> = (props: Props) => {
    const {image, year, title, buyInPrice, initialPrice, deadline} = props;

    return (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={`data:image/png;base64, ${image}`} />

            <Box p="6">
                <Box display="flex" alignItems="baseline">
                    <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                    >
                        Создана в {year}
                    </Box>
                </Box>

                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
                    {title}
                </Box>

                <Box>
                    Цена выкупа: {buyInPrice}
                    <Box as="span" color="gray.600" fontSize="sm">
                        / руб
                    </Box>
                </Box>
                <Box>
                    Стартовая ставка: {initialPrice}
                    <Box as="span" color="gray.600" fontSize="sm">
                        / руб
                    </Box>
                </Box>

                <Box display="flex" mt="2" alignItems="center">
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                        {moment(deadline).format()}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
