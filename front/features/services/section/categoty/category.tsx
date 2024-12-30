"use client";
import { useCallback, useMemo } from "react";

import { CardBasic } from "@/components/utils/cardBasic";
import { SearchableListSection } from "@/components/sections/listComponent/searchListSection";
import { IUService } from "@/interfaces/IUservices";
import { endPoints } from "@/config/endPoints";
import NoFountEvent from "@/public/images/no_fount_events.jpg";
import { getServiceCategory, getServices } from "@/features/services/services/services";
import { useApiRequest } from "@/hooks/useApiRequest";
import { IUCategory } from "@/interfaces/IUservices";
import { CardLoagin } from "@/components/utils/loagins/cardLoading";
import { searchFieldsServices } from "../../utils/searchFielServices";
import { notFound } from "next/navigation";

export function GetServicesByCategory({
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
    () => getServiceCategory(idcategory),
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
      return () => getServices({ category: categoryData.service_category_name });
    }

    return () => Promise.resolve([]); // Fallback for when categoryData is not available
  }, [categoryData]);

  // Handle loading, error, or no data for category
  if (categoryError) notFound()
  if (isCategoryLoading) return <CardLoagin description="Cargando categoría" />;

  return (
    <SearchableListSection<IUService>
      searchFields={searchFieldsServices}
      description={`${infoComponent.description}  (${categoryData.service_category_name})`}
      endpoint={endPoints.events.get}
      errorMessage="Error al obtener los servicios de la categoría"
      fetchData={fetchEvents}
      loadingMessage="Cargando servicios..."
      noDataMessage="No hay servicios en esta categoría"
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
