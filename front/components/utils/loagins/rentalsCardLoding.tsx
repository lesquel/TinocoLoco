"use client";

import React from "react";
import { Card, CardBody, Skeleton } from "@nextui-org/react";

const RentalEvent = () => {
  return <Skeleton className="w-3/4 h-6 rounded-lg" />;
};

export function RentalCardLoading() {
  return (
    <Card className="w-full max-w-[420px]">
      <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap justify-center items-center">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-40 h-40 rounded-lg" />
        </div>
        <div className="p-4 flex flex-col gap-2 w-full">
          <RentalEvent />
          <div className="flex flex-col gap-3 pt-2 text-small text-default-400">
            <Skeleton className="w-full h-4 rounded-lg" />
            <Skeleton className="w-full h-4 rounded-lg" />
            <Skeleton className="w-3/4 h-4 rounded-lg" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
