

'use client'

import { Card, CardBody, Skeleton } from "@nextui-org/react";

function StaffCardSkeleton() {
  return (
    <Card shadow="sm">
      <CardBody className="overflow-visible p-0">
        <Skeleton className="rounded-lg">
          <div className="h-[140px] rounded-lg bg-default-300"></div>
        </Skeleton>
      </CardBody>
      <CardBody className="text-small justify-between">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
      </CardBody>
    </Card>
  );
}

export function AboutSectionSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="mb-8">
        <Skeleton className="w-1/4 rounded-lg">
          <div className="h-8 w-1/4 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="w-full md:w-1/2">
          <Skeleton className="rounded-lg">
            <div className="h-[400px] rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
        <div className="w-full md:w-1/2">
          <Card>
            <CardBody>
              <Skeleton className="w-3/4 rounded-lg mb-4">
                <div className="h-8 w-3/4 rounded-lg bg-default-200"></div>
              </Skeleton>
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="w-full rounded-lg mb-4">
                  <div className="h-4 w-full rounded-lg bg-default-200"></div>
                </Skeleton>
              ))}
              <div className="flex justify-between mb-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="text-center">
                    <Skeleton className="w-16 rounded-lg mb-2">
                      <div className="h-6 w-16 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-24 rounded-lg">
                      <div className="h-4 w-24 rounded-lg bg-default-200"></div>
                    </Skeleton>
                  </div>
                ))}
              </div>
              <Skeleton className="w-1/3 rounded-lg">
                <div className="h-10 w-1/3 rounded-lg bg-default-200"></div>
              </Skeleton>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="mb-8">
        <Skeleton className="w-1/3 rounded-lg mx-auto">
          <div className="h-8 w-1/3 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <StaffCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

