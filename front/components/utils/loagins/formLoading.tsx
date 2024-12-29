"use client";

import { Skeleton } from "@nextui-org/react";

interface SkeletonFormProps {
  inputCount: number;
}

export function FormLoading({ inputCount }: SkeletonFormProps) {
  return (
    <div className="w-full max-w-md mx-auto space-y-4 p-4">
      <Skeleton className="h-8 w-3/4 mb-6" /> {/* Form title */}
      {Array.from({ length: inputCount }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-4 w-1/4" /> {/* Input label */}
          <Skeleton className="h-10 w-full" /> {/* Input field */}
        </div>
      ))}
      <Skeleton className="h-10 w-full mt-6" /> {/* Submit button */}
    </div>
  );
}
