import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import {OrderCreateArgs} from '../../types';
import React from 'react';
import api from '../../api';

type Props = {
    isOpen: boolean;
    isBuyIn: boolean;
    onClose: () => void;
    email: string;
    phone: string;
    productId: string;
    sellerId: string;
    customerId: string;
    minBet: number;
    token: string;
};

export const CreateOrderModal: React.FC<Props> = (props: Props) => {
    const initialRef = React.useRef(null);
    const {isOpen, isBuyIn, email, token, phone, productId, minBet, sellerId, customerId} = props;
    const onClose = () => {
        props.onClose();
    };

    const [formState, setFormState] = React.useState<OrderCreateArgs>({
        deliveryAddress: '',
        bet: isBuyIn ? minBet : 0,
        isBuyIn,
        email,
        phone,
        productId,
        sellerId,
        customerId,
    });

    const handleCreateOrder = async () => {
        await api.order.createOrder({...formState, productId, sellerId, customerId}, token);
        window.location.reload();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Создать заказ</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Адрес доставки</FormLabel>
                        <Input
                            ref={initialRef}
                            value={formState.deliveryAddress}
                            required={true}
                            onChange={(event) =>
                                setFormState((prevState: OrderCreateArgs) => ({
                                    ...prevState,
                                    deliveryAddress: event.target.value,
                                }))
                            }
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Почта</FormLabel>
                        <Input
                            value={formState.email}
                            required={true}
                            onChange={(event) =>
                                setFormState((prevState: OrderCreateArgs) => ({
                                    ...prevState,
                                    email: event.target.value,
                                }))
                            }
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Телефон</FormLabel>
                        <Input
                            type="text"
                            required={true}
                            value={formState.phone}
                            onChange={(event) =>
                                setFormState((prevState: OrderCreateArgs) => ({
                                    ...prevState,
                                    year: event.target.value,
                                }))
                            }
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>
                            {isBuyIn ? 'Цена выкупа' : `Ставка (не меньше ${minBet})`}
                        </FormLabel>
                        <Input
                            disabled={isBuyIn}
                            type="number"
                            required={true}
                            min={isBuyIn ? undefined : minBet + 1}
                            value={isBuyIn ? minBet : Number(formState.bet) || minBet || undefined}
                            onChange={(event) =>
                                setFormState((prevState: OrderCreateArgs) => ({
                                    ...prevState,
                                    bet: +event.target.value,
                                }))
                            }
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        mr={3}
                        disabled={Boolean(
                            !formState ||
                                !formState.bet ||
                                (!isBuyIn && formState.bet < minBet) ||
                                !formState.phone ||
                                !formState.email ||
                                !formState.deliveryAddress,
                        )}
                        onClick={() => {
                            if (
                                !Boolean(
                                    !formState ||
                                        !formState.bet ||
                                        (!isBuyIn && formState.bet < minBet) ||
                                        !formState.phone ||
                                        !formState.email ||
                                        !formState.deliveryAddress,
                                )
                            ) {
                                handleCreateOrder();
                            }
                        }}
                    >
                        Создать
                    </Button>
                    <Button onClick={props.onClose}>Отмена</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
