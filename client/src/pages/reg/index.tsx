import React, {useEffect} from 'react';
import {Input, Button, FormErrorMessage, FormControl, Text, Center, chakra} from '@chakra-ui/react';
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
            height: '250px',
            position: 'relative',
        },
    });

    return (
        <Center height="100vh">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Text fontSize="2xl">Регистрация</Text>
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
                    <Input
                        isInvalid={errors?.password}
                        type="password"
                        placeholder="password"
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
                    <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
                </FormControl>
                <Button
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    type="submit"
                    position="absolute"
                    bottom="0"
                >
                    Войти
                </Button>
            </Form>
        </Center>
    );
};

export default RegPage;
