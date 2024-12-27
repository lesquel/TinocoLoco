'use client';

import { useAsyncAction } from "@/hooks/useAsyncAction";
import { Button, Textarea } from "@nextui-org/react";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { addReview } from "@/features/events/services/events";
import { IUReview } from "@/interfaces/IUReview";
import { StarRating } from "./StarRating";

interface ReviewFormData {
  rating_score: number;
  rating_comment: string;
}

interface ReviewFormProps {
  eventId: number;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ eventId }) => {
  const { control, handleSubmit, reset } = useForm<ReviewFormData>();
  const { error, loading, execute } = useAsyncAction(addReview);

  const handleFormSubmit = useCallback(async (data: ReviewFormData) => {
    const reviewData: IUReview = {
      ...data,
      event_id: eventId,
    };

    try {
      await execute(reviewData);
      console.log("Review submitted successfully");
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  }, [eventId, execute, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Controller
        name="rating_score"
        control={control}
        defaultValue={0}
        rules={{ required: true, min: 1 }}
        render={({ field }) => (
          <StarRating
            rating={field.value}
            onRatingChange={(value) => field.onChange(value)}
          />
        )}
      />

      <Controller
        name="rating_comment"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <Textarea
            {...field}
            label="Comentario"
            placeholder="Escribe tu comentario aquí"
            className="w-full"
          />
        )}
      />

      {error && <p className="text-red-500">Error al enviar el comentario.</p>}
      <Button type="submit" color="primary" isLoading={loading} disabled={loading}>
        Enviar comentario
      </Button>
    </form>
  );
};

