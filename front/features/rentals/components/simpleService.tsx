"use client";

import { useCallback } from "react";

import { useApiRequest } from "@/hooks/useApiRequest";
import { getService } from "@/features/services/services/services";

export function SimpleService({
  idService,
  serviceQuantity,
}: {
  idService: number;
  serviceQuantity: number;
}) {
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
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-xl font-semibold mb-2">
        Servicios agregado: {data.service_name}
      </h3>
      <div className="flex items-center gap-2 mt-2">
        <span className="font-medium">Cantidad: </span>
        <span className="font-medium">{serviceQuantity}</span>
      </div>
    </div>
  );
}
