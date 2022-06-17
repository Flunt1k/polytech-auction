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
} from '@chakra-ui/react';
import {useForm} from 'react-hook-form';

const RegPage = () => {
    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        shouldFocusError: true,
    });

    const [show, setShow] = React.useState(false);

    const handleClick = () => setShow(!show);

    const onSubmit = () => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                console.log('submit');

                resolve();
            }, 3000);
        });
    };

    const Form = chakra('form', {
        baseStyle: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '30px',
            width: '350px',
            height: '550px',
            position: 'relative',
        },
    });

    // name: string;
    // lastName: string;
    // username: string;
    // password: string;
    // email: string;
    // phone: string;

    return (
        <Center height="100vh">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Text fontSize="2xl">Регистрация</Text>
                <FormControl isInvalid={errors?.name}>
                    <Input
                        isInvalid={errors?.name}
                        type="text"
                        placeholder="Имя"
                        {...register('name', {
                            required: 'Пожалуйста, введите ваше имя',
                        })}
                    />
                    <FormErrorMessage position="absolute">{errors?.name?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors?.lastName}>
                    <Input
                        isInvalid={errors?.lastName}
                        type="text"
                        placeholder="Фамилия"
                        {...register('lastName', {
                            required: 'Пожалуйста, введите вашу фамилию',
                        })}
                    />
                    <FormErrorMessage position="absolute">
                        {errors?.lastName?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors?.userName}>
                    <Input
                        isInvalid={errors?.userName}
                        type="text"
                        placeholder="Имя пользователя"
                        {...register('userName', {
                            required: 'Пожалуйста, введите ваше имя пользователя',
                        })}
                    />
                    <FormErrorMessage position="absolute">
                        {errors?.userName?.message}
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
                <FormControl isInvalid={errors?.email}>
                    <Input
                        isInvalid={errors?.email}
                        type="email"
                        placeholder="email"
                        {...register('email', {
                            required: 'Пожалуйста, введите ваш email',
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
                <FormControl isInvalid={errors?.phone}>
                    <Input
                        isInvalid={errors?.phone}
                        type="tel"
                        placeholder="Телефон"
                        {...register('phone', {
                            required: 'Пожалуйста, введите ваш телефон',
                        })}
                    />
                    <FormErrorMessage position="absolute">
                        {errors?.phone?.message}
                    </FormErrorMessage>
                </FormControl>
                <Button
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    type="submit"
                    position="absolute"
                    bottom="0"
                >
                    Зрегестрироваться
                </Button>
            </Form>
        </Center>
    );
};

export default RegPage;
