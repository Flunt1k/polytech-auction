import React from 'react';
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
    Textarea,
} from '@chakra-ui/react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {createProduct} from '../../redux/products/actions';
import {ProductCreateArgs} from '../../types';
import {selectUser} from '../../redux/user/selectors';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export const CreateProductModal: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector(selectUser);

    const [formState, setFormState] = React.useState<ProductCreateArgs>({
        productName: '',
        image: '',
        buyInPrice: undefined,
        initialPrice: undefined,
        deadline: undefined,
        description: '',
        year: '',
        ownerId: user?.id || '',
    });
    const initialRef = React.useRef(null);

    const handleCreateProduct = React.useCallback(() => {
        if (formState) {
            dispatch(createProduct(formState));
        }
    }, []);

    const {isOpen} = props;

    console.log(formState);

    return (
        <Modal isOpen={isOpen} onClose={props.onClose} initialFocusRef={initialRef}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Создать товар</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Название товара</FormLabel>
                        <Input
                            ref={initialRef}
                            value={formState.productName}
                            required={true}
                            onChange={(event) =>
                                setFormState((prevState: ProductCreateArgs) => ({
                                    ...prevState,
                                    productName: event.target.value,
                                }))
                            }
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Описание</FormLabel>
                        <Textarea
                            placeholder="Описание"
                            value={formState.description}
                            required={true}
                            onChange={(event) =>
                                setFormState((prevState: ProductCreateArgs) => ({
                                    ...prevState,
                                    description: event.target.value,
                                }))
                            }
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Год создания</FormLabel>
                        <Input
                            type="number"
                            required={true}
                            value={formState.year}
                            onChange={(event) =>
                                setFormState((prevState: ProductCreateArgs) => ({
                                    ...prevState,
                                    year: event.target.value,
                                }))
                            }
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Стартовая цена</FormLabel>
                        <Input
                            type="number"
                            required={true}
                            value={formState.initialPrice}
                            onChange={(event) =>
                                setFormState((prevState: ProductCreateArgs) => ({
                                    ...prevState,
                                    initialPrice: +event.target.value,
                                }))
                            }
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Цена выкупа (не обязательн)</FormLabel>
                        <Input
                            type="number"
                            value={formState.buyInPrice}
                            required={false}
                            onChange={(event) =>
                                setFormState((prevState: ProductCreateArgs) => ({
                                    ...prevState,
                                    buyInPrice: +event.target.value,
                                }))
                            }
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Дата окончания</FormLabel>
                        <Input
                            type="datetime-local"
                            value={formState.deadline}
                            required={false}
                            onChange={(event) =>
                                setFormState((prevState: ProductCreateArgs) => ({
                                    ...prevState,
                                    deadline: event.target.value,
                                }))
                            }
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        mr={3}
                        disabled={!formState}
                        onClick={handleCreateProduct}
                    >
                        Save
                    </Button>
                    <Button onClick={props.onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
