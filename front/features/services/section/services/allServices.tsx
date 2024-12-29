"use client";
import { getServices } from "../../services/services";

import { IUService } from "@/interfaces/IUservices";
import { CardBasic } from "@/components/utils/cardBasic";
import { endPoints } from "@/config/endPoints";
import NoFountEvent from "@/public/images/no_fount_events.jpg";
import { SearchableListSection } from "@/components/sections/listComponent/searchListSection";
import { searchFieldsServices } from "../../utils/searchFielServices";

export function AllServices({
  size,
  infoComponent,
}: {
  size: number;
  infoComponent: { title: string; description: string };
}) {
  return (
    <SearchableListSection<IUService>
      searchFields={searchFieldsServices}
      description={infoComponent.description}
      endpoint={endPoints.services.get}
      errorMessage="Error al obtener los servicios"
      fetchData={getServices}
      loadingMessage="Cargando servicios..."
      noDataMessage="No hay servicios"
      pageSize={size}
      renderCard={(service) => (
        <CardBasic
          key={service.id}
          defaultImage={NoFountEvent.src}
          idKey="id"
          imageKey="photos"
          item={service}
          titleKey="service_name"
          url={"/services/"}
        />
      )}
      title={infoComponent.title}
    />
  );
}
