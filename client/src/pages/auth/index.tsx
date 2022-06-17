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
    chakra,
} from '@chakra-ui/react';
import {useForm} from 'react-hook-form';

const AuthPage = () => {
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

export default AuthPage;
