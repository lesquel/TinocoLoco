"use client";
import { useCallback } from "react";

import { getMostViewedServices } from "../../services/services";

import { useApiRequest } from "@/hooks/useApiRequest";
import { TitleSection } from "@/components/utils/titleSection";
import { IUMostServiceViewed, IUService } from "@/interfaces/IUservices";
import { CardBasic } from "@/components/utils/cardBasic";
import NoFountServices from "@/public/images/no_fount_events.jpg";
import { CardLoagin } from "@/components/utils/loagins/cardLoading";
export function MostViewedSServices() {
  const fetchServices = useCallback(
    () => getMostViewedServices({ size: 4 }),
    [],
  );
  const { data, error, isLoading } =
    useApiRequest<IUMostServiceViewed>(fetchServices);

  if (error) {
    return <div>Error al obtener los datos</div>;
  }

  if (isLoading) {
    return <CardLoagin description="más vistos" title="Servicios" />;
  }

  if (!data?.results) {
    return <div>No hay servicios</div>;
  }

  return (
    <div>
      <TitleSection description="más vistos" title="Servicios" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {data.results.map((service: IUService) => {
          return (
            <CardBasic
              key={service.id}
              defaultImage={NoFountServices.src}
              idKey="id"
              imageKey="photos"
              item={service}
              titleKey="service_name"
              url="/services"
            />
          );
        })}
      </div>
    </div>
  );
}
