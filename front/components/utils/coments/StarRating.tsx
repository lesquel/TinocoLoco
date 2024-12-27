'use client';

import React from 'react';
import { FaStar } from "react-icons/fa6";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  return (
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
              onClick={() => onRatingChange(ratingValue)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onRatingChange(ratingValue);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Rate ${ratingValue} out of 5 stars`}
              aria-pressed={rating === ratingValue}
            />
          );
        })}
      </div>
    </div>
  );
};

