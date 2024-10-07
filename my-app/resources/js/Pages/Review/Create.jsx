import React, { useState } from "react";
import {
    Box,
    FormControl,
    Textarea,
    FormLabel,
    Heading,
    Text,
    Button,
    HStack,
    useDisclosure,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Spinner
} from "@chakra-ui/react";
import MainLayout from "@/Layouts/MainLayout.jsx";
import { router } from "@inertiajs/react";
import { StarIcon } from "@chakra-ui/icons";


const Create = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [Loading, setIsLoading] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);
    const [values, setValues] = useState({
        shop_id: props.shop.id,
        rating: 1,
        comment: "",
    });

    const handleCheck = (e) => {
        e.preventDefault();
        onOpen();
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        e.target.disabled = true;
        router.post(route('review.store', values));
    }

    return (
        <Box bg={'gray.50'} p={4} m={4} mx={'auto'} borderRadius={'md'} boxShadow={'md'} w={{base:'90%', md:700}}>
            {/* アラート */}
            <>
                <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                最終確認
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                この内容で投稿しますか？
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    キャンセル
                                </Button>
                                <Button colorScheme={'blue'} ml={3} onClick={handleSubmit}>
                                    {Loading ? <Spinner /> : '投稿する'}
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </>

            <Heading as='h2' size={'md'} mb={4}>レビューを投稿</Heading>
            <Text fontSize={'xl'} mb={2}>{props.shop.name}</Text>
            <form onSubmit={handleCheck}>
                <FormControl isRequired mb={4}>
                    <FormLabel htmlFor='rating' fontWeight={'bold'}>評価</FormLabel>
                </FormControl>
                <HStack spacing={1} mb={4}>
                    {Array(5).fill("").map((_, i) => (
                        <StarIcon key={i}
                                  color={i < values.rating || i < hoverRating ? 'yellow.500' : 'gray.300'}
                                  cursor={'pointer'}
                                  onClick={() => setValues({...values, rating: i + 1})}
                                  onMouseEnter={() => setHoverRating(i + 1)}
                                  onMouseLeave={() => setHoverRating(0)}
                        />
                    ))}
                </HStack>
                <FormControl isRequired mb={4}>
                    <FormLabel htmlFor='comment' fontWeight={'bold'}>コメント</FormLabel>
                    <Textarea id='comment' name='comment' onChange={handleChange} />
                </FormControl>
                <Button type='submit' colorScheme={'blue'}>投稿する</Button>
            </form>
        </Box>
    )
}

Create.layout = (page) => <MainLayout children={page} title='レビュー投稿' />;
export default Create;
