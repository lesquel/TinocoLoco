"use client";
import { useApiRequest } from "@/hooks/useApiRequest";
import { TitleSection } from "@/components/utils/titleSection";
import { IUMostServiceViewed, IUService } from "@/interfaces/IUservices";
import { getMostViewedServices } from "../../services/services";
import { CardBasic } from "@/components/utils/cardBasic";
import NoFountServices from "@/public/images/no_fount_events.jpg";
import { useCallback } from "react";
import { CardLoagin } from "@/components/utils/loagins/cardLoagin";
export function MostViewedSServices() {
  const fetchServices = useCallback(() => getMostViewedServices({ size: 6 }), []);
  const { data, error, isLoading } = useApiRequest<IUMostServiceViewed>(
    fetchServices,
  );

  if (error) {
    return <div>Error al obtener los datos</div>;
  }

  if (isLoading) {
    return <CardLoagin title="Servicios" description="más vistos" />;
  }

  if (!data?.results) {
    return <div>No hay servicios</div>;
  }
  return (
    <div>
      <TitleSection title="Servicios" description="más vistos" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {data.results.map((service: IUService) => {
          return (
            <CardBasic
              key={service.id}
              item={service}
              url="/services"
              imageKey="photos"
              titleKey="service_name"
              defaultImage={NoFountServices.src}
              idKey="id"
            />
          );
        })}
      </div>
    </div>
  );
}
