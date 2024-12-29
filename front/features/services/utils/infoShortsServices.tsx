import { useCallback } from "react";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";

import { getService } from "../services/services";

import { useApiRequest } from "@/hooks/useApiRequest";
import NoFountEvent from "@/public/images/no_fount_events.jpg";

export const InfoShortsServices = ({ idService }: { idService: number }) => {
  const fetchService = useCallback(() => getService(idService), [idService]);
  const { data, error, isLoading } = useApiRequest(fetchService);

  if (error) {
    return (
      <div className="text-danger">Error al obtener los datos del servicio</div>
    );
  }

  if (isLoading) {
    return <div className="text-default-500">Cargando servicio...</div>;
  }

  if (!data) {
    return (
      <div className="text-default-500">
        No se encontraron datos del servicio
      </div>
    );
  }

  return (
    <Card className="my-4 max-w-sm">
      <CardHeader className="flex-col items-start">
        <h4 className="font-bold text-large">{data.service_name}</h4>
        <p className="text-small text-default-500">
          Costo: ${data.service_unitary_cost}
        </p>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt={`Imagen de ${data.service_name}`}
          className="object-cover rounded-xl"
          height={200}
          src={data.photos.length ? data.photos[0].image_url : NoFountEvent.src}
          width={300}
        />
        <p className="text-small mt-2">{data.service_description}</p>
      </CardBody>
    </Card>
  );
};
