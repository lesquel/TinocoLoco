import { useApiRequest } from "@/hooks/useApiRequest";
import { getEvent } from "../services/events";
import { useCallback } from "react";
import NoFountEvent from "@/public/images/no_fount_events.jpg";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";

export function InforShorts({ idEvent }: { idEvent: number }) {
  const fetchEvent = useCallback(() => getEvent(idEvent), [idEvent]);
  const { data, error, isLoading } = useApiRequest(fetchEvent);

  if (error) {
    return <div className="text-danger">Error al obtener los datos del evento</div>;
  }

  if (isLoading) {
    return <div className="text-default-500">Cargando evento...</div>;
  }

  if (!data) {
    return <div className="text-default-500">No se encontraron datos del evento</div>;
  }

  return (
    <Card className="max-w-sm">
      <CardHeader className="flex-col items-start">
        <h4 className="font-bold text-large">{data.event_name}</h4>
        <p className="text-small text-default-500">Costo: ${data.event_reference_value}</p>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt={`Imagen de ${data.event_name}`}
          className="object-cover rounded-xl"
          src={data.photos.length ? data.photos[0].image_url : NoFountEvent.src}
          width={300}
          height={200}
        />
        <p className="text-small mt-2">{data.event_description}</p>
      </CardBody>
    </Card>
  );
}

