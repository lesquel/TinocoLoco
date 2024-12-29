"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { useCallback } from "react";
import { FaStar } from "react-icons/fa6";

import { ReviewsLoading } from "../loagins/reviewsLoading";

import { useApiRequest } from "@/hooks/useApiRequest";
import { getUser } from "@/features/auth/services/auth";

interface ReviewListProps {
  fetchReviews: (id: number) => Promise<any>;
  id: number;
}

const UserComponent = ({ idUser }: { idUser: number }) => {
  const fetchUser = useCallback(() => getUser(idUser), []);
  const { data: userData, isLoading } = useApiRequest(fetchUser);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <h3 className={`text-lg font-semibold ${!userData?.username ? "italic line-through" : ""}`}>
      {userData?.username || "Usuario eliminado"}
    </h3>
  );
};

export function ReviewList({ fetchReviews, id }: ReviewListProps) {
  const fetchEventReviews = useCallback(
    () => fetchReviews(id),
    [fetchReviews, id],
  );
  const { data: reviewsData, isLoading } = useApiRequest(fetchEventReviews);

  if (isLoading) {
    return <ReviewsLoading />;
  }

  if (!reviewsData?.results.length) {
    return <div>No hay reseñas disponibles.</div>;
  }
  const reviews = reviewsData?.results;

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar />
            <div>
              <UserComponent idUser={review.owner} />
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`h-5 w-5 ${
                      index < review.rating_score
                        ? "text-yellow-400"
                        : "text-gray-300"
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
