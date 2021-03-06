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
import {useNavigate} from 'react-router-dom';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export const CreateProductModal: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    const [formState, setFormState] = React.useState<ProductCreateArgs>({
        productName: '',
        image: '',
        buyInPrice: 0,
        initialPrice: 0,
        deadline: undefined,
        description: '',
        year: '',
        ownerId: user?.id || '',
    });
    const initialRef = React.useRef(null);

    const handleCreateProduct = React.useCallback(async () => {
        if (formState && user) {
            const id = await dispatch(createProduct({...formState, ownerId: user.id}));
            navigate(`/product/${id}`);
            props.onClose();
        }
    }, [dispatch, formState, navigate, props, user?.id]);

    if (!user) {
        return null;
    }

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
                            value={Number(formState.initialPrice) || undefined}
                            onChange={(event) =>
                                setFormState((prevState: ProductCreateArgs) => ({
                                    ...prevState,
                                    initialPrice:
                                        prevState.initialPrice === 0
                                            ? prevState.initialPrice + +event.target.value
                                            : +event.target.value,
                                }))
                            }
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Цена выкупа (не обязательн)</FormLabel>
                        <Input
                            type="number"
                            value={Number(formState.buyInPrice) || undefined}
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
                    <FormControl mt={4}>
                        <FormLabel>Дата окончания</FormLabel>
                        <Input
                            type="file"
                            required={false}
                            onChange={(event) => {
                                const file = event?.target.files?.[0];
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setFormState((prevState) => ({
                                        ...prevState,
                                        image: (reader.result as string).replace(
                                            'data:image/png;base64,',
                                            '',
                                        ),
                                    }));
                                };
                                if (file) {
                                    reader.readAsDataURL(new Blob([file], {type: 'image/png'}));
                                }
                            }}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        mr={3}
                        disabled={Boolean(
                            !formState ||
                                !formState.image ||
                                !formState.deadline ||
                                !formState.year ||
                                !formState.productName ||
                                !formState.initialPrice ||
                                !formState.description,
                        )}
                        onClick={() => {
                            if (
                                !Boolean(
                                    !formState ||
                                        !formState.image ||
                                        !formState.deadline ||
                                        !formState.year ||
                                        !formState.productName ||
                                        !formState.initialPrice ||
                                        !formState.description,
                                )
                            ) {
                                handleCreateProduct();
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
