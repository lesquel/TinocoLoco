"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Avatar, AvatarIcon } from "@nextui-org/react";
import { useCallback } from "react";
import { useApiRequest } from "@/hooks/useApiRequest";
import { getReviews } from "@/features/events/services/events";
import { FaStar } from "react-icons/fa6";


export function ReviewList({fetchData, eventId}: {fetchData?: any, eventId: number}) {
  
  const fecthEvent = useCallback(() => getReviews(eventId), []);
  const { data: reviewsData, isLoading } = useApiRequest(fecthEvent);
  // const fetchUser = useCallback(() => getUser(data.reviewsData.), []);
  // const { data: userData, isLoading: isUserLoading } = useApiRequest(fetchUser);
  
  if (isLoading) {
    return <div>Cargando...</div>;
  }
  const reviews = reviewsData?.results;

  return (
    <div className="space-y-4">
      {reviews && reviews.map((review) => (
        <Card key={review.id}>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
                {review.owner}
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">User {review.owner}</h3>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`h-5 w-5 ${
                      index < review.rating_score ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <p>{review.rating_comment}</p>
          </CardBody>
          <CardFooter className="text-sm text-gray-500">
            {new Date(review.created_at).toLocaleDateString()}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

