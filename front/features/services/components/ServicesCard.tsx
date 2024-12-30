"use client";

import {
  Card,
  CardBody,
  Chip,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { useCallback } from "react";

import { getService } from "../services/services";

import { ChipCategory } from "./chipCategoy";

import { useApiRequest } from "@/hooks/useApiRequest";
import { ImageCarousel } from "@/components/utils/carucelImg";
import { IUService } from "@/interfaces/IUservices";
import { CardInfoLoadin } from "@/components/utils/loagins/cardInfoLoading";
import { notFound } from "next/navigation";

export default function ServicesCard({ id }: { id: number }) {
  const fetchEvent = useCallback(() => getService(id), []);
  const { data, error, isLoading } = useApiRequest<IUService>(fetchEvent);

  if (error) notFound()
  if (isLoading) {
    return <CardInfoLoadin />;
  }


  return (
    <Card className="w-full mx-auto">
      <CardBody className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
          <div className="relative p-4 ">
            <Chip
              className="absolute top-2 left-2 z-40"
              color="primary"
              variant="solid"
            >
              Popular
            </Chip>
            <ImageCarousel images={data.photos} />
          </div>

          <div className="flex flex-col gap-4 p-4">
            <div>
              <h1 className="text-2xl font-bold">{data.service_name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-semibold">
                  ${data.service_unitary_cost}
                </span>
                <Chip size="sm" variant="flat">
                  {data.view_count} visualizaciones
                </Chip>
              </div>
            </div>

            <Accordion>
              <AccordionItem
                key="2"
                aria-label="Descripción"
                title="Descripción"
              >
                <p className="text-justify leading-relaxed whitespace-pre-line">
                  {data.service_description}
                </p>
              </AccordionItem>
              <AccordionItem
                key="1"
                aria-label="Detalles de servicio"
                title="Detalles de servicio"
              >
                <div className="space-y-2">
                  <ChipCategory idCategory={data.service_category} />
                  <p>
                    Fecha de creacion:{" "}
                    {new Date(data.creation_date).toLocaleDateString()}
                  </p>
                  <p>
                    Fecha de actualización:{" "}
                    {new Date(
                      data.last_actualization_date,
                    ).toLocaleDateString()}
                  </p>
                </div>
              </AccordionItem>
            </Accordion>

            <div className="mt-4 flex gap-2">
              {/* <Button
                isIconOnly
                variant="flat"
                size="lg"
              >
                <CiHeart />
              </Button> */}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
