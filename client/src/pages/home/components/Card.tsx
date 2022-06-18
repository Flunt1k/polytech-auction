import {Box, GridItem} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import React from 'react';
import moment from 'moment';

type Props = {
    title: string;
    price: number | undefined;
    price2: number | undefined;
    datetime: string;
    id: string;
};

export const Card: React.FC<Props> = ({id, price2, price, datetime, title}: Props) => {
    const navigate = useNavigate();
    return (
        <GridItem>
            <Box
                padding="3px"
                maxWidth="xs"
                borderWidth="1px"
                borderRadius="lg"
                borderColor="antiquewhite"
                overflow="hidden"
                cursor="pointer"
                _hover={{transform: 'scale(1.05)'}}
                onClick={() => navigate(`/product/${id}`)}
                margin="10px"
            >
                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
                    Название: {title}
                </Box>
                {price && (
                    <Box>
                        Цена выкупа: {price}
                        <Box as="span" color="white.600" fontSize="sm">
                            / руб
                        </Box>
                    </Box>
                )}
                {price2 && (
                    <Box>
                        Стартовая ставка: {price2}
                        <Box as="span" color="white.600" fontSize="sm">
                            / руб
                        </Box>
                    </Box>
                )}
                <Box display="flex" mt="2" alignItems="center">
                    <Box as="span" color="white.600" fontSize="sm">
                        Дата истечения: {moment(datetime).format('DD.MM.YYYY hh:mm:ss')}
                    </Box>
                </Box>
            </Box>
        </GridItem>
    );
};
