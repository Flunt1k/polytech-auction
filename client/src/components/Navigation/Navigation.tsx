import React from 'react';
import {Box, Button, Center, Flex, Icon, IconButton, Spacer} from '@chakra-ui/react';
import {FaHome} from 'react-icons/fa';
import {RiAuctionFill} from 'react-icons/ri';
import {MdSell} from 'react-icons/md';
import {BsArrowRightSquare} from 'react-icons/bs';

export const Navigation: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        const navStatus = localStorage.getItem('navigation');
        setIsOpen(navStatus === 'open');
    }, []);

    React.useEffect(() => {
        localStorage.setItem('navigation', isOpen ? 'open' : 'close');
    }, [isOpen]);

    const width = isOpen ? '220px' : '52px';

    return (
        <Box height="100vh" width={width} overflow="hidden" borderRight="1px solid white">
            <Flex flexDirection="column" height="100%">
                <Center>
                    <Icon
                        as={RiAuctionFill}
                        width="24px"
                        height="24px"
                        marginTop="20px"
                        _hover={{cursor: 'pointer'}}
                    />
                </Center>
                <Box borderTop="1px solid white" borderBottom="1px solid white" marginTop="20px">
                    <Center>
                        {isOpen ? (
                            <Button
                                variant="ghost"
                                borderRadius="0"
                                aria-label={'user'}
                                borderBottom="1px solid white"
                            >
                                <Flex>
                                    <Center>
                                        <Icon as={FaHome} marginRight="5px" />
                                        Домашняя страница
                                    </Center>
                                </Flex>
                            </Button>
                        ) : (
                            <IconButton
                                borderBottom="1px solid white"
                                variant="ghost"
                                borderRadius="0"
                                aria-label={'user'}
                                icon={<Icon as={FaHome} />}
                                width="100%"
                            />
                        )}
                    </Center>

                    {isOpen ? (
                        <Button variant="ghost" borderRadius="0" aria-label={'user'} width="100%">
                            <Flex width="100%">
                                <Box justifyContent="flex-start" alignItems="center">
                                    <Center>
                                        <Icon as={MdSell} marginRight="5px" />
                                        Продажи
                                    </Center>
                                </Box>
                            </Flex>
                        </Button>
                    ) : (
                        <Center>
                            <IconButton
                                variant="ghost"
                                borderRadius="0"
                                aria-label={'user'}
                                icon={<Icon as={MdSell} />}
                                width="100%"
                            />
                        </Center>
                    )}
                </Box>
                <Spacer />
                <Center>
                    <IconButton
                        borderTop="1px solid white"
                        variant="ghost"
                        borderRadius="0"
                        aria-label={'user'}
                        icon={<Icon as={BsArrowRightSquare} />}
                        width="100%"
                        transform={isOpen ? 'rotateY(180deg)' : ''}
                        onClick={() => setIsOpen((value) => !value)}
                    />
                </Center>
            </Flex>
        </Box>
    );
};
