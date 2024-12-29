"use client";
import { useCallback } from "react";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { FaStar } from "react-icons/fa6";

import { useApiRequest } from "@/hooks/useApiRequest";
import { getUser } from "@/features/auth/services/auth";

const UserComponent = ({ idUser }: { idUser: number }) => {
  const fetchUser = useCallback(() => getUser(idUser), []);
  const { data: userData, isLoading } = useApiRequest(fetchUser);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <h3 className="text-lg font-semibold">
      Usuario {userData?.username || userData?.first_name}
    </h3>
  );
};

export const SectionReview = ({ item }: { item: any }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar />
        <div>
          <UserComponent idUser={item.owner} />
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`h-5 w-5 ${
                  index < item.rating_score
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <p>{item.rating_comment} </p>
      </CardBody>
      <CardFooter className="text-sm text-gray-500">
        {new Date(item.created_at).toLocaleDateString()}
      </CardFooter>
    </Card>
  );
};
