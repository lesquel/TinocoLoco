"use client";
import { useApiRequest } from "@/hooks/useApiRequest";
import { TitleSection } from "@/components/utils/titleSection";
import { IUMostServiceViewed, IUService } from "@/interfaces/IUservices";
import { getMostViewedServices } from "../../services/services";
import { CardBasic } from "@/components/utils/cardBasic";
import NoFountServices from "@/public/images/no_fount_events.jpg";
export function MostViewedSServices() {
  const { data, error } = useApiRequest<IUMostServiceViewed>(
    getMostViewedServices,
  );

  if (error) {
    return <div>Error al obtener los datos</div>;
  }

  if (!data) {
    return <div>Cargando...</div>;
  }
  return (
    <div>
      <TitleSection title="Servicios" description="más vistos" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-4">
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
