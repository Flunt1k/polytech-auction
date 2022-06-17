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

    console.log(image);

    return (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image
                src={
                    'data:image/png;base64, AQAAAQwrAAACA2RlZgNkYjEHUHJvZHVjdAdQcm9kdWN0AmlkAmlkDOAAkAAAAP6DUAAAAD0AAAMDZGVmA2RiMQdQcm9kdWN0B1Byb2R1Y3QLcHJvZHVjdE5hbWULcHJvZHVjdE5hbWUM4AD8AwAA_QEQAAAAMQAABANkZWYDZGIxB1Byb2R1Y3QHUHJvZHVjdAVpbWFnZQVpbWFnZQw_AP__AAD8kRAAAAA9AAAFA2RlZgNkYjEHUHJvZHVjdAdQcm9kdWN0C2Rlc2NyaXB0aW9uC2Rlc2NyaXB0aW9uDOAA_AMAAP0BEAAAAC8AAAYDZGVmA2RiMQdQcm9kdWN0B1Byb2R1Y3QEeWVhcgR5ZWFyDOAA_AMAAP0BEAAAADsAAAcDZGVmA2RiMQdQcm9kdWN0B1Byb2R1Y3QKYnV5SW5QcmljZQpidXlJblByaWNlDD8AFgAAAAUAAB8AAD8AAAgDZGVmA2RiMQdQcm9kdWN0B1Byb2R1Y3QMaW5pdGlhbFByaWNlDGluaXRpYWxQcmljZQw_ABYAAAAFAAAfAAA3AAAJA2RlZgNkYjEHUHJvZHVjdAdQcm9kdWN0CGRlYWRsaW5lCGRlYWRsaW5lDD8AEwAAAAyAAAAAADUAAAoDZGVmA2RiMQdQcm9kdWN0B1Byb2R1Y3QHZXhwaXJlZAdleHBpcmVkDD8AAQAAAAEAAAAAADUAAAsDZGVmA2RiMQdQcm9kdWN0B1Byb2R1Y3QHb3duZXJJZAdvd25lcklkDOAAkAAAAP6IQAAAADkAAAwDZGVmA2RiMQdQcm9kdWN0B1Byb2R1Y3QJY3JlYXRlZEF0CWNyZWF0ZWRBdAw_ABMAAAAMgRAAAAA5AAANA2RlZgNkYjEHUHJvZHVjdAdQcm9kdWN0CXVwZGF0ZWRBdAl1cGRhdGVkQXQMPwATAAAADIEQAAAABQAADv4AACIAxAAADyQzZDg0ZWIwOS01ZDU5LTQ2ODEtOTExNi1jNTU1ZTFiN2ZhOGUMVGVzdF9Qcm9kdWN0DVtvYmplY3QgQmxvYl0QVGVzdF9EZXNjcmlwdGlvbgQyMDIxBTEwMjAwBDYwMDATMjAyMi0wNy0xMCAyMTowMDowMAEwJDkzZDY3ODNiLWEwMmItNDU1OC1hNDhiLWQ0MDRlNzg3NzQ4NhMyMDIyLTA2LTE3IDE4OjMzOjU0EzIwMjItMDYtMTcgMTg6MzM6NTQFAAAQ_gAAIgA'
                }
            />

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
