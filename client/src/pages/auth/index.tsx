import React from 'react';
import {
    Input,
    Button,
    FormErrorMessage,
    FormControl,
    Text,
    Center,
    InputRightElement,
    InputGroup,
    Box,
    Select,
    chakra,
} from '@chakra-ui/react';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {setUser, setToken} from '../../redux/user/actions';

import api from '../../api';

const AuthPage = () => {
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

    const registrationRedirectHandler = () => {
        navigate('/registration');
    };

    const onSubmit = () => {
        return new Promise<void>((resolve) => {
            const formData = getValues();

            if (formData.userType === 'customer') {
                delete formData.userType;

                api.customer.login(formData as {email: string; password: string}).then((res) => {
                    if ('token' in res) {
                        dispatch(setUser(res.user));
                        dispatch(setToken(res.token));
                        navigate('/');
                        resolve();
                    }
                });
            }

            if (formData.userType === 'seller') {
                delete formData.userType;

                api.seller.login(formData as {email: string; password: string}).then((res) => {
                    if ('token' in res) {
                        dispatch(setUser(res.user));
                        dispatch(setToken(res.token));
                        navigate('/');
                        resolve();
                    }
                });
            }
        });
    };

    const userTypesOptions = [
        {label: 'Покупатель', value: 'customer'},
        {label: 'Продавец', value: 'seller'},
    ];

    const Form = chakra('form', {
        baseStyle: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '30px',
            width: '350px',
            height: '250px',
            position: 'relative',
        },
    });

    return (
        <Center height="100vh">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Text fontSize="2xl">Авторизация</Text>
                <FormControl isInvalid={errors?.email}>
                    <Input
                        isInvalid={errors?.email}
                        type="text"
                        placeholder="email"
                        {...register('email', {
                            required: 'Пожалуйста, введите Email',
                            pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: 'Некорректный Email',
                            },
                        })}
                    />
                    <FormErrorMessage position="absolute">
                        {errors?.email?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors?.password}>
                    <InputGroup>
                        <Input
                            paddingRight={'7rem'}
                            isInvalid={errors?.password}
                            type={show ? 'text' : 'password'}
                            placeholder="Пароль"
                            {...register('password', {
                                required: 'Пожалуйста, введите пароль',
                                minLength: {
                                    value: 6,
                                    message: 'Пароль должен быть больше 6-ти символов',
                                },
                                maxLength: {
                                    value: 10,
                                    message: 'Пароль должен быть меньше 10-ти символов',
                                },
                            })}
                        />
                        <InputRightElement width="6em">
                            <Button onClick={handleClick}>{show ? 'Скрыть' : 'Показать'}</Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage position="absolute">
                        {errors?.password?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors?.userType}>
                    <Select
                        placeholder="Выберите тип пользователя"
                        {...register('userType', {
                            required: 'Пожалуйста, выберите тип пользователя',
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
                <Box display="flex" width="100%" justifyContent="space-evenly">
                    <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                        Войти
                    </Button>
                    <Button colorScheme="blue" onClick={registrationRedirectHandler}>
                        Зарегестрироваться
                    </Button>
                </Box>
            </Form>
        </Center>
    );
};

export default AuthPage;
