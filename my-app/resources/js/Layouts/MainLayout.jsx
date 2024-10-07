import React from "react";
import { Box, Heading, HStack, Link, IconButton, Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";
import { HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";

const MainLayout = ({ children, title }) => {
    return (
        <>
            <header>
                {/* ヘッダー */}
                <Box bg={"orange.800"}>
                    <HStack justifyContent={"space-between"} alignItems={'center'} py={{base:0, md:3}} px={{base:1, md:2}}>
                        <Heading as='h1' size={{base:'xs', md:'md'}} color={'white'}>
                            <Link href='/home' _hover={{color:'gray.400'}}>{import.meta.env.VITE_APP_NAME}</Link>
                        </Heading>
                        {/* PC表示 */}
                        <HStack display={{ base:'none', md:'flex' }} color={'white'} fontWeight={'bold'}>
                            <Link href='#' _hover={{color:'gray.400'}}>マイページ</Link>
                            <Link href='#' _hover={{color:'gray.400'}}>店舗の登録</Link>
                        </HStack>

                        {/* SP表示 */}
                        <Box display={{base:'block', md:'none'}} px={{base:'1', md:'none'}} py={{base:'2', md:'none'}}>
                            <Menu>
                                <MenuButton as={IconButton} aria-label='Options' icon={<HamburgerIcon />} variant={'outline'} colorScheme='white' />
                                <MenuList>
                                    <MenuItem icon={<SettingsIcon />}>
                                        マイページ
                                    </MenuItem>
                                    <MenuItem>
                                        店舗の登録
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Box>
                    </HStack>
                </Box>
            </header>

            {/* コンテンツ */}
            <Box>{children}</Box>

            {/* フッター */}
            <Box>
                <Box bg={'orange.800'}　color={'white'} fontWeight={'bold'} textAlign={'center'} py={{base:2, md:3}}>
                    <Text fontSize={{base:13, md:16}}>&copy; 2024 {import.meta.env.VITE_APP_NAME}</Text>
                </Box>
            </Box>
        </>
    );
}

export default MainLayout;
