import React from "react";
import { Link as InertiaLink, usePage } from "@inertiajs/react";
import {
    Box,
    Heading,
    HStack,
    Link,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Text,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    VStack,

} from "@chakra-ui/react";
import { HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";

const MainLayout = ({ children, title }) => {
    const { auth } = usePage().props;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
                size={{ base: 'xs', md: 'md' }}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        {auth.user ? (<Box>{auth.user.name}さん</Box>) : (<Box>ゲストさん</Box>)}
                    </DrawerHeader>

                    <DrawerBody>
                        <VStack>
                            {auth.user ? (
                                <>
                                    <Link href='/' _hover={{ color: 'gray.400' }}>ホーム</Link>
                                    <Link href={route('profile.edit')} _hover={{ color: 'gray.400' }}>マイページ</Link>
                                    <Link href='#' _hover={{ color: 'gray.400' }}>店舗の登録</Link>
                                    <InertiaLink href={route('logout')} method='post' onClick={onClose}>ログアウト</InertiaLink>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        ログイン
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        新規登録
                                    </Link>
                                </>
                            )}
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            <header>
                {/* ヘッダー */}
                <Box bg={"orange.800"}>
                    <HStack justifyContent={"space-between"} alignItems={'center'} py={{ base: 0, md: 3 }} px={{ base: 1, md: 2 }}>
                        <Heading as='h1' size={{ base: 'xs', md: 'md' }} color={'white'}>
                            <Link href='/' _hover={{ color: 'gray.400' }}>{import.meta.env.VITE_APP_NAME}</Link>
                        </Heading>
                        {/* PC表示 */}
                        <HStack display={{ base: 'none', md: 'flex' }} color={'white'} fontWeight={'bold'}>
                            {auth.user ? (
                                <Box>
                                    <Text onClick={onOpen} cursor={'pointer'} display={'flex'} alignItems={'center'} ref={btnRef}>{auth.user.name}さん<SettingsIcon mx={1} /></Text>
                                </Box>
                            ) : (
                                <>
                                    <Box>
                                        <Link href={route('login')} _hover={{ color: 'gray.400' }}>
                                            <Button colorScheme={'white'} variant={'outline'}>ログイン</Button>
                                        </Link>
                                    </Box>
                                    <Box>
                                        <Link href={route('register')} _hover={{ color: 'gray.400' }}>
                                            <Button colorScheme={'blue'}>新規登録</Button>
                                        </Link>
                                    </Box>
                                </>
                            )}
                        </HStack>

                        {/* SP表示 */}
                        <Box display={{ base: 'block', md: 'none' }} px={{ base: '1', md: 'none' }} py={{ base: '2', md: 'none' }}>
                            <HamburgerIcon ref={btnRef} onClick={onOpen} cursor={'pointer'} fontSize={'xl'} />
                        </Box>
                    </HStack>
                </Box>
            </header>

            {/* コンテンツ */}
            <Box flex="1">{children}</Box>

            {/* フッター */}
            <Box mt="auto">
                <Box bg={'orange.800'} color={'white'} fontWeight={'bold'} textAlign={'center'} py={{ base: 2, md: 3 }}>
                    <Text fontSize={{ base: 13, md: 16 }}>&copy; 2024 {import.meta.env.VITE_APP_NAME}</Text>
                </Box>
            </Box>
        </Box>
    );
}

export default MainLayout;
