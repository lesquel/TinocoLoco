"use client";

import React, { useCallback } from "react";
import { Card, Image, CardBody } from "@nextui-org/react";
import Link from "next/link";

import { IURental } from "@/interfaces/IURental";
import { getEvent } from "@/features/events/services/events";
import { useApiRequest } from "@/hooks/useApiRequest";
import { IUEvent } from "@/interfaces/IUevents";
import NoFountRental from "@/public/images/no_fount_events.jpg";

const RentalEvent = ({ idEvent }: { idEvent: number }) => {
  const fetchEvent = useCallback(() => getEvent(idEvent), [idEvent]);
  const { data, error, isLoading } = useApiRequest<IUEvent>(fetchEvent);

  if (error) {
    return <div>Error al obtener los datos</div>;
  }
  if (!data || isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <h3 className="text-large font-medium">
      Renta de servicio {data.event_name}
    </h3>
  );
};

export function CardRental({ rental }: { rental: IURental }) {
  return (
    <Card as={Link} className="w-full" href={`/rentals/${rental.id}`}>
      <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap justify-center items-center">
        <div className="flex flex-col gap-2">
          <Image
            removeWrapper
            alt="Rental Image"
            className=" object-cover object-center w-40"
            src={rental.photos[0] || NoFountRental.src}
          />
        </div>
        <div className="p-4 flex flex-col gap-2">
          <RentalEvent idEvent={rental.event} />
          <div className="flex flex-col gap-3 pt-2 text-small text-default-400">
            <p>
              <span className="font-medium">Fecha de creación:</span>{" "}
              {rental.event_rental_creation_date}
            </p>
            <p>
              <span className="font-medium">Fecha de inicio:</span>{" "}
              {rental.event_rental_start_time}
            </p>
            <p>
              <span className="font-medium">Hora de finalización:</span>{" "}
              {rental.event_rental_planified_end_time}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
