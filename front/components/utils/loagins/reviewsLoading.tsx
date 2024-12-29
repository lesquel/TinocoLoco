import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Skeleton,
  Spacer,
} from "@nextui-org/react";

export default function ReviewCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-32 h-4" />
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-5 w-5 rounded-full" />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <Skeleton className="w-full h-6 mb-2" />
        <Skeleton className="w-3/4 h-6" />
      </CardBody>
      <CardFooter className="text-sm text-gray-500">
        <Skeleton className="w-24 h-4" />
      </CardFooter>
    </Card>
  );
}

export function ReviewsLoading({ count = 5 }) {
  return (
    <div className="space-y-4">
      <ReviewCardSkeleton />
      <Spacer y={4} />
      <ReviewCardSkeleton />
    </div>
  );
}
