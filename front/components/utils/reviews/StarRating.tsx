"use client";

import React from "react";
import { FaStar } from "react-icons/fa6";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRatingChange,
}) => {
  return (
    <div>
      <p className="mb-2">Calificación:</p>
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;

          return (
            <FaStar
              key={index}
              aria-label={`Rate ${ratingValue} out of 5 stars`}
              aria-pressed={rating === ratingValue}
              className="cursor-pointer"
              color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
              role="button"
              size={24}
              tabIndex={0}
              onClick={() => onRatingChange(ratingValue)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onRatingChange(ratingValue);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
