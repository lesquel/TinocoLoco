"use client";

import { useCallback } from "react";
import { useApiRequest } from "@/hooks/useApiRequest";
import { getService } from "@/features/services/services/services";
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { FaTrash } from "react-icons/fa6";
import NoFountEvent from "@/public/images/no_fount_events.jpg";

interface SimpleServiceProps {
  idService: number;
  serviceQuantity: number;
  onRemove: () => void;
}

export function SimpleService({
  idService,
  serviceQuantity,
  onRemove,
}: SimpleServiceProps) {
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
    <div className="flex items-center justify-center w-full">
      <Card className="max-w-[300px] p-2 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <Image
            alt={`Imagen de ${data.service_name}`}
            className="object-cover rounded-full w-20 h-20"
            src={
              data.photos && data.photos.length > 0
                ? data.photos[0].image_url
                : NoFountEvent.src
            }
          />
          <CardBody className="flex-1 ml-2">
            <h3 className="text-xl font-semibold mb-2">{data.service_name} {data.id}</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-medium">Cantidad: </span>
              <span className="font-medium">{serviceQuantity}</span>
            </div>
          </CardBody>
        </div>
        <Button
          color="danger"
          variant="light"
          isIconOnly
          onClick={onRemove}
          className="self-start mt-2 mr-2"
        >
          <FaTrash />
        </Button>
      </Card>
    </div>
  );
}

