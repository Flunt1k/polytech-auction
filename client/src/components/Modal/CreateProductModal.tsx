import React from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import {useLocation, useNavigate} from 'react-router-dom';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export const CreateProductModal: React.FC<Props> = (props: Props) => {
    const initialRef = React.useRef(null);

    const {isOpen} = props;

    return (
        <Modal isOpen={isOpen} onClose={props.onClose} initialFocusRef={initialRef}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Создать товар</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>First name</FormLabel>
                        <Input ref={initialRef} placeholder="First name" />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Last name</FormLabel>
                        <Input placeholder="Last name" />
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
