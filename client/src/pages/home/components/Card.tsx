import {Badge, Box, GridItem} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import React from 'react';
import moment from 'moment';

type Props = {
    title?: string;
    price?: number;
    price2?: number;
    datetime?: string;
    id?: string;
    author?: string;
    isBuyIn?: boolean;
    bet?: number;
};

export const Card: React.FC<Props> = ({
    id,
    isBuyIn,
    price2,
    author,
    price,
    datetime,
    title,
    bet,
}: Props) => {
    const navigate = useNavigate();
    return (
        <GridItem>
            <Box
                padding="15px"
                maxWidth="xs"
                borderWidth="1px"
                borderRadius="lg"
                borderColor="antiquewhite"
                overflow="hidden"
                cursor="pointer"
                _hover={{transform: 'scale(1.05)'}}
                onClick={() => {
                    if (id) {
                        navigate(`/product/${id}`);
                    }
                }}
                margin="10px"
            >
                {Boolean(isBuyIn) && (
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                        Выкуп
                    </Badge>
                )}
                {author && (
                    <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
                        Ставка от пользователя: {author}
                    </Box>
                )}
                {Boolean(isBuyIn) && bet && (
                    <Box>
                        Выкупил за: {bet}
                        <Box as="span" color="white.600" fontSize="sm">
                            / руб
                        </Box>
                    </Box>
                )}
                {!isBuyIn && bet && (
                    <Box>
                        Cтавка: {bet}
                        <Box as="span" color="white.600" fontSize="sm">
                            / руб
                        </Box>
                    </Box>
                )}
                {title && (
                    <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
                        Название: {title}
                    </Box>
                )}
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
                {datetime && (
                    <Box display="flex" mt="2" alignItems="center">
                        <Box as="span" color="white.600" fontSize="sm">
                            Дата истечения: {moment(datetime).format('DD.MM.YYYY hh:mm:ss')}
                        </Box>
                    </Box>
                )}
            </Box>
        </GridItem>
    );
};
