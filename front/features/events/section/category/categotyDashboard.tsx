"use client";
import { getCategorys } from "../../services/events";

import { SearchableListSection } from "@/components/sections/listComponent/searchListSection";
import { endPoints } from "@/config/endPoints";
import { IUCategory } from "@/interfaces/IUevents";
import { CategoryCardBasic } from "@/components/utils/categoryBasic";

export function CategoryDashboard() {
  return (
    <SearchableListSection<IUCategory>
      description="Eventos"
      endpoint={endPoints.events.category.get}
      errorMessage="Error al obtener las categorías"
      fetchData={getCategorys}
      loadingMessage="Cargando categorías..."
      noDataMessage="No hay categorías"
      pageSize={5}
      renderCard={(category) => (
        <CategoryCardBasic
          key={category.id}
          altText={category.event_category_image}
          imageUrl={category.event_category_image_url}
          linkUrl={`dashboard/events/category/${category.id}`}
          title={category.event_category_name}
        />
      )}
      title="Categorías"
    />
  );
}
