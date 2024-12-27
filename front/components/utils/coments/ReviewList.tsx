"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { useCallback } from "react";
import { useApiRequest } from "@/hooks/useApiRequest";
import { FaStar } from "react-icons/fa6";

interface ReviewListProps {
  fetchReviews: (id: number) => Promise<any>;
  id: number;
}

export function ReviewList({ fetchReviews, id }: ReviewListProps) {
  const fetchEventReviews = useCallback(() => fetchReviews(id), [fetchReviews, id]);
  const { data: reviewsData, isLoading } = useApiRequest(fetchEventReviews);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  const reviews = reviewsData?.results || [];

  return (
    <div className="space-y-4">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar></Avatar>
              <div>
                <h3 className="text-lg font-semibold">Usuario {review.owner}</h3>
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
        ))
      ) : (
        <p>No hay reseñas disponibles.</p>
      )}
    </div>
  );
}

