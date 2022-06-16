import React from 'react';
import {Box, Button, Center, Flex, Icon, IconButton, Spacer} from '@chakra-ui/react';
import {RiAuctionFill} from 'react-icons/ri';
import {BsArrowRightSquare} from 'react-icons/bs';
import {IconType} from 'react-icons';

export type AsideMenuConfig = {
    openText: string;
    icon: IconType;
    aria: string;
};

type MenuButtonProps = {
    isOpen: boolean;
    icon: IconType;
    buttonText: string;
    aria: string;
};

export const MenuButton: React.FC<MenuButtonProps> = ({isOpen, buttonText, icon, aria}) => {
    return isOpen ? (
        <Button
            variant="ghost"
            borderRadius="0"
            aria-label={aria}
            borderBottom="1px solid white"
            width="100%"
        >
            <Flex width="100%">
                <Center>
                    <Icon as={icon} marginRight="5px" />
                    {buttonText}
                </Center>
            </Flex>
        </Button>
    ) : (
        <Center>
            <IconButton
                borderBottom="1px solid white"
                variant="ghost"
                borderRadius="0"
                aria-label={aria}
                icon={<Icon as={icon} />}
                width="100%"
            />
        </Center>
    );
};

type NavigationProps = {
    config: AsideMenuConfig[];
};

export const Navigation: React.FC<NavigationProps> = ({config}) => {
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
                <Box borderTop="1px solid white" marginTop="20px">
                    {config.map(({openText, icon, aria}) => {
                        return (
                            <MenuButton
                                isOpen={isOpen}
                                icon={icon}
                                buttonText={openText}
                                aria={aria}
                            />
                        );
                    })}
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
