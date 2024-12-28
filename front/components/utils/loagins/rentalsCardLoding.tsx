"use client";

import React, { useCallback } from "react";
import { Button, Card, Image, CardBody, Skeleton } from "@nextui-org/react";
import Link from "next/link";

// Componente que carga el evento
const RentalEvent = () => {
    return (
      <Skeleton className="w-full h-5 mb-2" />
    );
};

// Componente principal con el Skeleton Loader
export function RentalCardLoding() {
  return (
    <Card className="w-full max-w-[420px]">
      <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap">
        <div className="flex flex-col gap-2">
          {/* Skeleton para la imagen */}
          <Skeleton
          className="w-40 h-40 rounded-full"
          />
        </div>
        <div className="p-4 flex flex-col gap-2">
          <RentalEvent />
          <div className="flex flex-col gap-3 pt-2 text-small text-default-400">
            {/* Skeleton para las fechas */}
            <Skeleton className="w-full h-5 mb-2" />
            <Skeleton className="w-full h-5 mb-2" />
            <Skeleton className="h-5 mb-2" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
