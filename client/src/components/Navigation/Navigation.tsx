import React from 'react';
import {Box, Button, Center, Flex, Icon, IconButton, Spacer} from '@chakra-ui/react';
import {RiAuctionFill} from 'react-icons/ri';
import {BsArrowRightSquare} from 'react-icons/bs';
import {BiLogOut} from 'react-icons/bi';
import {IconType} from 'react-icons';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setToken} from '../../redux/user/actions';

export type AsideMenuConfig = {
    openText: string;
    icon: IconType;
    aria: string;
    path?: string;
    onClick?: () => void;
};

type MenuButtonProps = {
    isOpen: boolean;
    icon: IconType;
    buttonText: string;
    aria: string;
    onClick: () => void;
};

const MenuButton: React.FC<MenuButtonProps> = ({isOpen, buttonText, icon, aria, onClick}) => {
    return isOpen ? (
        <Button
            variant="ghost"
            borderRadius="0"
            aria-label={aria}
            borderBottom="1px solid white"
            width="100%"
            onClick={onClick}
        >
            <Flex width="100%">
                <Center>
                    <Icon as={icon} marginRight="5px" color="white" />
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
                onClick={onClick}
                color="white"
            />
        </Center>
    );
};

type NavigationProps = {
    config: AsideMenuConfig[];
};

export const Navigation: React.FC<NavigationProps> = ({config}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const logOutHandler = () => {
        localStorage.removeItem('token')
        dispatch(setToken(''));
    };

    React.useEffect(() => {
        const navStatus = localStorage.getItem('navigation');
        setIsOpen(navStatus === 'open');
    }, []);

    React.useEffect(() => {
        localStorage.setItem('navigation', isOpen ? 'open' : 'close');
    }, [isOpen]);

    const width = isOpen ? '240px' : '52px';

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
                    {config.map(({openText, icon, aria, path, onClick}) => {
                        return (
                            <MenuButton
                                key={aria}
                                isOpen={isOpen}
                                icon={icon}
                                buttonText={openText}
                                aria={aria}
                                onClick={() => {
                                    if (path) {
                                        navigate(path);
                                    } else if (onClick) {
                                        onClick();
                                    }
                                }}
                            />
                        );
                    })}
                </Box>
                <Spacer />
                <Center>
                    {isOpen ? (
                        <Button
                            width="100%"
                            variant="ghost"
                            borderRadius="0"
                            borderTop="1px solid white"
                            onClick={logOutHandler}
                        >
                            Выйти
                        </Button>
                    ) : (
                        <IconButton
                            borderTop="1px solid white"
                            variant="ghost"
                            borderRadius="0"
                            aria-label={'user'}
                            icon={<Icon as={BiLogOut} />}
                            width="100%"
                            onClick={logOutHandler}
                        />
                    )}
                </Center>
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
