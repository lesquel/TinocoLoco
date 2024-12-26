"use client";
import { SearchableListSection } from "@/components/sections/listComponent/searchListSection";
import { endPoints } from "@/config/endPoints";
import { IUCategory } from "@/interfaces/IUevents";
import { getCategory, getCategorys } from "../../services/events";
import { CategoryCardBasic } from "@/components/utils/categoryBasic";

export function CategoryDashboard() {
  return <SearchableListSection<IUCategory>
    endpoint={endPoints.events.category.get}
    title="Categorías"
    description="Eventos"
    fetchData={getCategorys}
    renderCard={(category) => (
      <CategoryCardBasic key={category.id}
        imageUrl={category.event_category_image_url}
        altText={category.event_category_image}
        title={category.event_category_name}
        linkUrl={`dashboard/events/category/${category.id}`}
      />
    )}
    pageSize={5}
    noDataMessage="No hay categorías"
    errorMessage="Error al obtener las categorías"
    loadingMessage="Cargando categorías..."
  />;
}
