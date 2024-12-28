"use client";
import { useApiRequest } from "@/hooks/useApiRequest";
import { TitleSection } from "@/components/utils/titleSection";
import { IUMostServicePopular, IUService } from "@/interfaces/IUservices";
import { getMostPopularServices } from "../../services/services";
import { CardBasic } from "@/components/utils/cardBasic";
import NoFountServices from "@/public/images/no_fount_events.jpg";
import { CardLoagin } from "@/components/utils/loagins/cardLoagin";
import { useCallback } from "react";
export function MostPopularServices() {
  const fetchServices = useCallback(() => getMostPopularServices({ size: 6 }), []);
  const { data, error, isLoading } = useApiRequest<IUMostServicePopular>(
    fetchServices,
  );

  if (error) {
    return <div>Error al obtener los datos</div>;
  }

  if (isLoading) {
    return <CardLoagin title="Servicios" description="más populares" />;
  }
  if (!data?.results) {
    return <div>No hay servicios</div>;
  }
  return (
    <div>
      <TitleSection title="Servicios" description="más populares" />
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
