'use client'

import {
  Card,
  CardBody,
  Image,
  Button,
  Chip,
  Accordion,
  AccordionItem,
} from "@nextui-org/react"
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
                  {event.visualizations} views
                </Chip>
              </div>
            </div>

            <p className="text-default-500 line-clamp-3">{event.event_description}</p>

            <div>
              <p className="text-sm text-default-500">Event Details:</p>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <Chip size="sm">
                  {event.event_allowed_hours} hours included
                </Chip>
                <Chip size="sm">
                  ${event.event_extra_hour_rate}/extra hour
                </Chip>
              </div>
            </div>

            <Accordion>
              <AccordionItem key="1" aria-label="Event Details" title="Event Details">
                <div className="space-y-2">
                  <ChipCategory idCategory={event.event_category} />
                  <p>Created: {new Date(event.creation_date).toLocaleDateString()}</p>
                  <p>Last Updated: {new Date(event.last_actualization_date).toLocaleDateString()}</p>
                </div>
              </AccordionItem>
              <AccordionItem key="2" aria-label="Terms & Conditions" title="Terms & Conditions">
                <p>Standard booking terms and conditions apply.</p>
              </AccordionItem>
            </Accordion>

            <div className="mt-4 flex gap-2">
              <Button
                className="flex-1"
                color="primary"
                size="lg"
              >
                Book Now
              </Button>
              <Button
                isIconOnly
                variant="flat"
                size="lg"
              >
                <CiHeart />
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

