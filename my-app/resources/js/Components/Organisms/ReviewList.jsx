import React from "react";
import ReviewItem from "@/Components/Molecules/ReviewItem.jsx";
import {Box} from "@chakra-ui/react";


const ReviewList = ({ reviews }) => {
     return (
         <Box>
             {reviews.map((review, index) => (
                 <ReviewItem key={index} review={review} />
             ))}
         </Box>
     )
}
export default ReviewList;
