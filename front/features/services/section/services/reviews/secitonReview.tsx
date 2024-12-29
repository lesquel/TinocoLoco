"use client";
import { useState, useCallback } from "react";

import { Section } from "@/components/sections/layout/section";
import { ReviewForm } from "@/components/utils/reviews/ReviewForm";
import { ReviewList } from "@/components/utils/reviews/ReviewList";
import { addReview, getReviews } from "@/features/services/services/services";

export const SectionReview = ({ serviceId }: { serviceId: number }) => {
  const [reviewsKey, setReviewsKey] = useState(0);

  const handleReviewAdded = useCallback(() => {
    setReviewsKey((prevKey) => prevKey + 1);
  }, []);

  return (
    <div className="flex flex-col w-full gap-4 max-w-xl mx-auto">
      <Section>
        <ReviewForm
          fetchData={addReview}
          id={serviceId}
          onReviewAdded={handleReviewAdded}
        />
      </Section>
      <Section>
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <ReviewList key={reviewsKey} fetchReviews={getReviews} id={serviceId} />
      </Section>
    </div>
  );
};
