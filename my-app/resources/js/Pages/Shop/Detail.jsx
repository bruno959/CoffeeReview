import MainLayout from "@/Layouts/MainLayout.jsx";
import { Box, Heading, Image, Text, HStack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const Detail = (props) => {
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
                    {props.reviews.map((review) =>
                        <Box key={review.id} p={4} borderWidth={'1px'} borderRadius={'lg'} overflow={'hidden'} boxShadow={'lg'} mb={4}>
                            <Text>{review.comment}</Text>
                            <Text textAlign={'right'} mt={2} fontSize={'sm'}>{review.user.name}</Text>
                            <HStack>
                                {Array(5).fill("").map((_, i) => (
                                    <StarIcon key={i} color={i < review.rating ? 'yellow.500' : 'gray.300'} />
                                ))}
                            </HStack>
                        </Box>
                )}
                </Box>
            </Box>
        </Box>
    )
};
Detail.layout = (page) => <MainLayout children={page} title='ショップ詳細' />;

export default Detail;
