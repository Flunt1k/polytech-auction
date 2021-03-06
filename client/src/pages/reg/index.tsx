import React from 'react';
import {
    Input,
    Button,
    FormErrorMessage,
    FormControl,
    Text,
    Center,
    chakra,
    InputRightElement,
    InputGroup,
    Select,
} from '@chakra-ui/react';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {setUser, setToken} from '../../redux/user/actions';

import api from '../../api';
import {SellerCreateArgs, CustomerCreateArgs} from '../../types';

const RegPage = () => {
    const {
        handleSubmit,
        register,
        getValues,
        formState: {errors, isSubmitting},
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        shouldFocusError: true,
    });

    const [show, setShow] = React.useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleClick = () => setShow(!show);

    const onSubmit = () => {
        return new Promise<void>((resolve) => {
            const formData = getValues();

            if (formData.userType === 'customer') {
                delete formData.userType;

                api.customer.createCustomer(formData as CustomerCreateArgs).then((res) => {
                    dispatch(setUser(res.customer));
                    dispatch(setToken(res.token));
                    navigate('/')
                    resolve();
                });
            }

            if (formData.userType === 'seller') {
                delete formData.userType;

                api.seller.createSeller(formData as SellerCreateArgs).then((res) => {
                    dispatch(setUser(res.seller));
                    dispatch(setToken(res.token));
                    navigate('/');
                    resolve();
                });
            }
        });
    };

    const Form = chakra('form', {
        baseStyle: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '30px',
            width: '350px',
            height: '600px',
            position: 'relative',
        },
    });

    const userTypesOptions = [
        {label: '????????????????????', value: 'customer'},
        {label: '????????????????', value: 'seller'},
    ];

    return (
        <Center height="100vh">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Text fontSize="2xl">??????????????????????</Text>
                <FormControl isInvalid={errors?.name}>
                    <Input
                        isInvalid={errors?.name}
                        type="text"
                        placeholder="??????"
                        {...register('name', {
                            required: '????????????????????, ?????????????? ???????? ??????',
                        })}
                    />
                    <FormErrorMessage position="absolute">{errors?.name?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors?.lastName}>
                    <Input
                        isInvalid={errors?.lastName}
                        type="text"
                        placeholder="??????????????"
                        {...register('lastName', {
                            required: '????????????????????, ?????????????? ???????? ??????????????',
                        })}
                    />
                    <FormErrorMessage position="absolute">
                        {errors?.lastName?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors?.username}>
                    <Input
                        isInvalid={errors?.username}
                        type="text"
                        placeholder="?????? ????????????????????????"
                        {...register('username', {
                            required: '????????????????????, ?????????????? ???????? ?????? ????????????????????????',
                        })}
                    />
                    <FormErrorMessage position="absolute">
                        {errors?.username?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors?.password}>
                    <InputGroup>
                        <Input
                            paddingRight={'7rem'}
                            isInvalid={errors?.password}
                            type={show ? 'text' : 'password'}
                            placeholder="????????????"
                            {...register('password', {
                                required: '????????????????????, ?????????????? ????????????',
                                minLength: {
                                    value: 6,
                                    message: '???????????? ???????????? ???????? ???????????? 6-???? ????????????????',
                                },
                                maxLength: {
                                    value: 10,
                                    message: '???????????? ???????????? ???????? ???????????? 10-???? ????????????????',
                                },
                            })}
                        />
                        <InputRightElement width="6em">
                            <Button onClick={handleClick}>{show ? '????????????' : '????????????????'}</Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage position="absolute">
                        {errors?.password?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors?.userType}>
                    <Select
                        placeholder="???????????????? ?????? ????????????????????????"
                        {...register('userType', {
                            required: '????????????????????, ???????????????? ?????? ????????????????????????',
                        })}
                    >
                        {userTypesOptions?.map((el, i) => {
                            return (
                                <option key={i} value={el.value}>
                                    {el.label}
                                </option>
                            );
                        })}
                    </Select>
                    <FormErrorMessage position="absolute">
                        {errors?.userType?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors?.email}>
                    <Input
                        isInvalid={errors?.email}
                        type="email"
                        placeholder="email"
                        {...register('email', {
                            required: '????????????????????, ?????????????? ?????? email',
                            pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: '???????????????????????? Email',
                            },
                        })}
                    />
                    <FormErrorMessage position="absolute">
                        {errors?.email?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors?.phone}>
                    <Input
                        isInvalid={errors?.phone}
                        type="tel"
                        placeholder="??????????????"
                        {...register('phone', {
                            required: '????????????????????, ?????????????? ?????? ??????????????',
                        })}
                    />
                    <FormErrorMessage position="absolute">
                        {errors?.phone?.message}
                    </FormErrorMessage>
                </FormControl>
                <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                    ??????????????????????????????????
                </Button>
            </Form>
        </Center>
    );
};

export default RegPage;
