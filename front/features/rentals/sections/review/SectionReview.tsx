"use client";
import { useState, useCallback } from "react";
import { Section } from "@/components/sections/layout/section";
import { ReviewForm } from "@/components/utils/coments/ReviewForm";
import { addReview } from "@/features/rentals/services/rentals";

export const SectionReview = ({ rentalId }: { rentalId: number }) => {
  const [reviewsKey, setReviewsKey] = useState(0);

  const handleReviewAdded = useCallback(() => {
    setReviewsKey((prevKey) => prevKey + 1);
  }, []);

  return (
    <div className="flex flex-col w-full gap-4 max-w-xl mx-auto">
      <Section>
        <ReviewForm id={rentalId} fetchData={addReview} onReviewAdded={handleReviewAdded} />
      </Section>
    </div>
  );
};

