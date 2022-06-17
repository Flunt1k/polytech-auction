import React from 'react';
import {Box, Center, GridItem, Image} from '@chakra-ui/react';
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
        <GridItem>
            <Center>
                <Box
                    maxW="sm"
                    borderWidth="1px"
                    borderRadius="lg"
                    borderColor="antiquewhite"
                    overflow="hidden"
                    cursor="pointer"
                    _hover={{transform: 'scale(1.02)'}}
                >
                    <Image src={`data:image/png;base64, ${image}`} />

                    <Box p="6">
                        <Box display="flex" alignItems="baseline">
                            <Box
                                color="gray.500"
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="xs"
                                textTransform="uppercase"
                            >
                                Год создания: {year}
                            </Box>
                        </Box>

                        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
                            Название: {title}
                        </Box>

                        <Box>
                            Цена выкупа: {buyInPrice}
                            <Box as="span" color="white.600" fontSize="sm">
                                / руб
                            </Box>
                        </Box>
                        <Box>
                            Стартовая ставка: {initialPrice}
                            <Box as="span" color="white.600" fontSize="sm">
                                / руб
                            </Box>
                        </Box>

                        <Box display="flex" mt="2" alignItems="center">
                            <Box as="span" color="white.600" fontSize="sm">
                                Дата истечения: {moment(deadline).format('DD.MM.YYYY hh:mm:ss')}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Center>
        </GridItem>
    );
};
