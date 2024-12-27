"use client";
import { IURental } from "@/interfaces/IURental";
import { Button, Card, CardBody, Image } from "@nextui-org/react";
import NoFountRental from "@/public/images/no_fount_events.jpg";
import { getEvent } from "@/features/events/services/events";
import { useCallback } from "react";
import { useApiRequest } from "@/hooks/useApiRequest";
import { IUEvent } from "@/interfaces/IUevents";

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
    <Card className="w-full max-w-[520px]">
      <Button
        isIconOnly
        className="absolute right-2 top-2 z-20"
        radius="full"
        size="sm"
        variant="light"
      ></Button>
      <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap">
        <Image
          removeWrapper
          alt="Acme Creators"
          className="h-auto w-full flex-none object-cover object-top md:w-48"
          src={rental.photos[0] || NoFountRental.src}
        />
        <div className="px-4 py-5">
          <RentalEvent idEvent={rental.event} />
          <div className="flex flex-col gap-3 pt-2 text-small text-default-400">
            <p>
                <span className="font-medium">Fecha de creación:</span>{" "}
                {rental.event_rental_creation_date}
                <span className="font-medium">Fecha de inicio:</span>{" "}
                {rental.event_rental_start_time}
                <span className="font-medium">Hora de finalización:</span>{" "}
                {rental.event_rental_planified_end_time}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
