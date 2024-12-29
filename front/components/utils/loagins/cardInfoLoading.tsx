"use client";

import {
  Card,
  CardBody,
  Skeleton,
  Chip,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";

export function CardInfoLoadin() {
  return (
    <Card className="w-full mx-auto">
      <CardBody className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
          {/* Image Section */}
          <div className="relative p-4 h-[400px]">
            <Chip
              className="absolute top-2 left-2 z-40"
              color="primary"
              variant="solid"
            >
              <Skeleton className="w-16 h-4 rounded-full" />
            </Chip>
            <Skeleton className="w-full h-full rounded-lg" />
          </div>

          {/* Content Section */}
          <div className="flex flex-col gap-4 p-4">
            {/* Title and Price */}
            <div>
              <Skeleton className="w-3/4 h-8 mb-2" />
              <div className="flex items-center gap-2 mt-2">
                <Skeleton className="w-24 h-8" />
                <Chip size="sm" variant="flat">
                  <Skeleton className="w-24 h-4 rounded-full" />
                </Chip>
              </div>
            </div>

            {/* Event Details */}
            <div>
              <Skeleton className="w-40 h-4 mb-2" />
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <Chip size="sm">
                  <Skeleton className="w-32 h-4 rounded-full" />
                </Chip>
                <Chip size="sm">
                  <Skeleton className="w-32 h-4 rounded-full" />
                </Chip>
              </div>
            </div>

            {/* Accordion Section */}
            <Accordion>
              <AccordionItem
                key="1"
                aria-label="Descripción"
                title={<Skeleton className="w-24 h-4" />}
              >
                <Skeleton className="w-full h-16" />
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Detalles del evento"
                title={<Skeleton className="w-36 h-4" />}
              >
                <div className="space-y-2">
                  <Skeleton className="w-32 h-6 rounded-full" />
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-3/4 h-4" />
                  <Skeleton className="w-3/4 h-4" />
                </div>
              </AccordionItem>
            </Accordion>

            {/* Buttons Section */}
            <div className="mt-4 flex gap-2">
              <Skeleton className="w-32 h-10 rounded-lg" />
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
