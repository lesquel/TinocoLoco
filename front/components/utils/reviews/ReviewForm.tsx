"use client";

import { Button, Textarea } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa6";

import { useAsyncAction } from "@/hooks/useAsyncAction";
import { IUReview } from "@/interfaces/IUReview";

interface ReviewFormData {
  rating_score: number;
  rating_comment: string;
}

interface ReviewFormProps {
  id: number;
  fetchData: (data: IUReview) => Promise<any>;
  onReviewAdded: () => void;
}

export const ReviewForm = ({
  id,
  fetchData,
  onReviewAdded,
}: ReviewFormProps) => {
  const [rating, setRating] = useState<number>(0);
  const { control, handleSubmit, setValue, reset } = useForm<ReviewFormData>();
  const { error, loading, execute } = useAsyncAction(fetchData);

  const handleFormSubmit = useCallback(
    (data: ReviewFormData) => {
      console.log("data", data);
      const reviewData: IUReview = {
        ...data,
        rating_score: rating,
        id: id,
      };
      console.log("reviewData", reviewData);
      execute(reviewData, (response) => {
        console.log("response eeeeeeeeeeeeeeeeeeeeeeeeee", response);
        onReviewAdded();

        reset();
        setRating(0);
      });
    },
    [execute, id, rating, onReviewAdded, reset],
  );

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <p className="mb-2">Calificación:</p>
        <div className="flex">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;

            return (
              <FaStar
                key={index}
                className="cursor-pointer"
                color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                size={24}
                onClick={() => {
                  setRating(ratingValue);
                  setValue("rating_score", ratingValue);
                }}
              />
            );
          })}
        </div>
      </div>

      <Controller
        control={control}
        defaultValue=""
        name="rating_comment"
        render={({ field, fieldState }) => (
          <>
            <Textarea
              {...field}
              className="w-full"
              label="Comentario"
              placeholder="Escribe tu comentario aquí"
            />
            {fieldState.error && (
              <p className="text-red-500 text-sm mt-1">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
        rules={{ required: "El comentario es obligatorio." }}
      />

      {error && (
        <p className="text-red-500 text-sm">
          No se pudo enviar el comentario. Por favor, inténtalo nuevamente.
        </p>
      )}
      <Button
        color="danger"
        disabled={loading}
        isLoading={loading}
        type="submit"
      >
        Enviar comentario
      </Button>
    </form>
  );
};
