import React, { useEffect } from "react";
import MainLayout from "@/Layouts/MainLayout.jsx";
import { Box, Heading, Image, Text, Link, Button, useToast } from "@chakra-ui/react";
import { SmallAddIcon  } from "@chakra-ui/icons";
import ReviewList  from "@/Components/Organisms/ReviewList.jsx";

const Detail = (props) => {
    const toast = useToast();

    useEffect(() => {
        if (props.status === 'review-created') {
            toast({
                position: 'bottom',
                title: 'レビューを投稿成功',
                description: 'レビューを投稿しました。',
                status: 'success',
                duration: 6000,
                isClosable: true,
            });
        }
    }, [props.status]);
    return (
        <Box p={4}>
            <Heading as='h2' size={'xl'} mb={4}>
                {props.shop.name}
            </Heading>
            <Image boxSize='300px' objectFit='contain' src='https://via.placeholder.com/300' alt={props.shop.name} mb={4} />
            <Text mb={2}>{props.shop.description}</Text>
            <Text mb={2}>{props.shop.location}</Text>

            <Box mt={8}>
                <Heading as='h3' size={'lg'} mb={1}>
                    レビュー
                </Heading>
                <Box>
                    <Link href={`/review/create/shop/${props.shop.id} `}>
                        <Button my={4}><SmallAddIcon />レビューを書く</Button>
                    </Link>
                </Box>
                <Box>
                    {props.reviews.length > 0 &&
                        <Box mb={2}>
                            ({props.reviews.length})
                        </Box>
                    }
                </Box>

                <Box>
                    {props.reviews.length === 0 &&
                        <Text>レビューはまだありません。</Text>
                    }
                    <ReviewList reviews={props.reviews} />
                </Box>
            </Box>
        </Box>
    )
};
Detail.layout = (page) => <MainLayout children={page} title='ショップ詳細' />;

export default Detail;
