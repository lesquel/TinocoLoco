"use client";
import { endPoints } from "@/config/endPoints";
import { getCategorys } from "@/features/events/services/events";
import { IUCategory, IUEvent } from "@/interfaces/IUevents";
import { SearchableListSection } from "@/components/sections/listComponent/searchListSection";
import { CategoryCardBasic } from "@/components/utils/categoryBasic";
import { searchFieldsCategory } from "../../utils/searchFielCategory";

export function AllCategorysEvent({
  size,
  infoComponent,
}: {
  size: number;
  infoComponent: { title: string; description: string };
}) {
  return (
    <SearchableListSection<IUCategory>
      description={infoComponent.description}
      endpoint={endPoints.events.category.get}
      errorMessage="Error al obtener los Categorias"
      fetchData={getCategorys}
      loadingMessage="Cargando Categorias..."
      noDataMessage="No hay Categorias"
      pageSize={size}
      searchFields={searchFieldsCategory}
      renderCard={(event) => (
        <CategoryCardBasic
          key={event.id}
          altText={event.event_category_image}
          imageUrl={event.event_category_image_url}
          linkUrl={`/events/category/${event.id}`}
          title={event.event_category_name}
        />
      )}
      title={infoComponent.title}
    />
  );
}
