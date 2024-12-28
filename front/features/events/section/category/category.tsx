"use client";
import { CardBasic } from "@/components/utils/cardBasic";
import { SearchableListSection } from "@/components/sections/listComponent/searchListSection";
import { IUService } from "@/interfaces/IUservices";
import { endPoints } from "@/config/endPoints";
import NoFountEvent from "@/public/images/no_fount_events.jpg";
import { getCategory, getEvents } from "@/features/events/services/events";
import { useApiRequest } from "@/hooks/useApiRequest";
import { IUCategory } from "@/interfaces/IUevents";
import { useCallback, useMemo } from "react";

export function GetEventsByCategory({
  idcategory,
  size,
  infoComponent,
}: {
  idcategory: number;
  size: number;
  infoComponent: { title: string; description: string };
}) {
  // Fetch the category data
  const fetchCategory = useCallback(
    () => getCategory(idcategory),
    [idcategory],
  );
  const {
    data: categoryData,
    error: categoryError,
    isLoading: isCategoryLoading,
  } = useApiRequest<IUCategory>(fetchCategory);

  // Memoize the fetchServices function to ensure stable references
  const fetchEvents = useMemo(() => {
    if (categoryData) {
      return () => getEvents({ category: categoryData.event_category_name });
    }
    return () => Promise.resolve([]); // Fallback for when categoryData is not available
  }, [categoryData]);

  // Handle loading, error, or no data for category
  if (categoryError)
    return <div>Error al obtener los datos de la categoría</div>;
  if (isCategoryLoading) return <div>Cargando categoría...</div>;
  if (!categoryData) return <div>No se encontró la categoría</div>;

  return (
    <SearchableListSection<IUService>
      endpoint={endPoints.events.get}
      title={infoComponent.title}
      description={`${infoComponent.description}  (${categoryData.event_category_name})`}
      fetchData={fetchEvents}
      renderCard={(service) => (
        <CardBasic
          key={service.id}
          item={service}
          url={"/events/"}
          imageKey="photos"
          titleKey="service_name"
          defaultImage={NoFountEvent.src}
          idKey="id"
        />
      )}
      pageSize={size}
      noDataMessage="No hay servicios en esta categoría"
      errorMessage="Error al obtener los servicios de la categoría"
      loadingMessage="Cargando servicios..."
    />
  );
}
