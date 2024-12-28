"use client";

import {
  Card,
  CardBody,
  Image,
  Button,
  Chip,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { IUEvent, IUOneEvent } from "@/interfaces/IUevents";
import { CiHeart } from "react-icons/ci";
import { useCallback } from "react";
import { getEvent } from "../services/events";
import { useApiRequest } from "@/hooks/useApiRequest";
import { ChipCategory } from "./chipCategoy";
import { ImageCarousel } from "@/components/utils/carucelImg";

export default function EventCard({ id }: { id: number }) {
  const fetchEvent = useCallback(() => getEvent(id), [id]);
  const { data, error, isLoading } = useApiRequest<IUEvent>(fetchEvent);

  if (error) {
    return <div>Error al obtener los datos</div>;
  }
  if (!data || isLoading) {
    return <div>Cargando...</div>;
  }

  const event = data;

  return (
    <Card className="w-full mx-auto">
      <CardBody className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
          <div className="relative p-4 max-h-[200px]">
            <Chip
              className="absolute top-2 left-2 z-40"
              color="primary"
              variant="solid"
            >
              Popular
            </Chip>
            <ImageCarousel images={event.photos} />
          </div>

          <div className="flex flex-col gap-4 p-4">
            <div>
              <h1 className="text-2xl font-bold">{event.event_name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-semibold">
                  ${event.event_reference_value}
                </span>
                <Chip size="sm" variant="flat">
                  {event.view_count} visualizaciones
                </Chip>
              </div>
            </div>

            <div>
              <p className="text-sm text-default-500">Detalles de eventos:</p>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <Chip size="sm">
                  {event.event_allowed_hours}{" "}
                  {event.event_allowed_hours === 1
                    ? "hora extra permitida"
                    : "horas extras permitidas"}
                </Chip>
                <Chip size="sm">
                  ${event.event_extra_hour_rate} extra por hora
                </Chip>
              </div>
            </div>

            <Accordion>
              <AccordionItem
                key="2"
                aria-label="Descripción"
                title="Descripción"
              >
                <p>{event.event_description}</p>
              </AccordionItem>
              <AccordionItem
                key="1"
                aria-label="Detalles del evento"
                title="Detalles del evento"
              >
                <div className="space-y-2">
                  <ChipCategory idCategory={event.event_category} />
                  <p>Precio del evento: ${event.event_reference_value}</p>
                  <p>
                    Fecha de creación:{" "}
                    {new Date(event.creation_date).toLocaleDateString()}
                  </p>
                  <p>
                    Fecha de actualización:{" "}
                    {new Date(
                      event.last_actualization_date,
                    ).toLocaleDateString()}
                  </p>
                </div>
              </AccordionItem>
            </Accordion>

            <div className="mt-4 flex gap-2">
              <Button className="flex-1" color="primary" size="lg">
                Alquilar ahora
              </Button>
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
