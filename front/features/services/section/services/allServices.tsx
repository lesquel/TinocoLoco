"use client"
import { IUService } from "@/interfaces/IUservices";
import { getServices } from "../../services/services";
import { CardBasic } from "@/components/utils/cardBasic";
import { endPoints } from "@/config/endPoints";
import NoFountEvent from "@/public/images/no_fount_events.jpg";
import { SearchableListSection } from "@/components/sections/listComponent/searchListSection";

export function AllServices({
  size,
  infoComponent,
}: {
  size: number;
  infoComponent: { title: string; description: string };
}) {
  return (
    <SearchableListSection<IUService>
      endpoint={endPoints.services.get}
      title={infoComponent.title}
      description={infoComponent.description}
      fetchData={getServices}
      renderCard={(service) => (
        <CardBasic
          key={service.id}
          item={service}
          url={"/services/"}
          imageKey="photos"
          titleKey="service_name"
          defaultImage={NoFountEvent.src}
          idKey="id"
        />
      )}
      pageSize={size}
      noDataMessage="No hay servicios"
      errorMessage="Error al obtener los servicios"
      loadingMessage="Cargando servicios..."
    />
  );
}


