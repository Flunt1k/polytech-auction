import React, {useEffect} from 'react';
import {Input, Button, FormErrorMessage, FormControl} from '@chakra-ui/react';
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

    const onSubmit = () => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                console.log('submit');

                resolve();
            }, 3000);
        });
    };

    useEffect(() => {
        console.log(errors);
    }, [errors?.password]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors?.email}>
                <Input
                    isInvalid={errors?.email}
                    type="email"
                    placeholder="email"
                    {...register('email', {
                        required: 'Пожалуйста, введите Email',
                        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    })}
                />
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors?.password}>
                <Input
                    isInvalid={errors?.password}
                    type="password"
                    placeholder="password"
                    {...register('password', {
                        required: 'Пожалуйста, введите пароль',
                        minLength: {value: 6, message: 'Пароль должен быть больше 6-ти символов'},
                        maxLength: {value: 10, message: 'Пароль должен быть меньше 10-ти символов'},
                    })}
                />
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
            </FormControl>
            <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                Submit
            </Button>
        </form>
    );
};

export default AuthPage;
