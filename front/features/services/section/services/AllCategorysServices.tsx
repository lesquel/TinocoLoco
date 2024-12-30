"use client";
import { endPoints } from "@/config/endPoints";
import { SearchableListSection } from "@/components/sections/listComponent/searchListSection";
import { CategoryCardBasic } from "@/components/utils/categoryBasic";
import { searchFieldsCategory } from "../../utils/searchFielCategory";
import { IUCategory } from "@/interfaces/IUservices";
import { getServiceCategorys } from "@/features/services/services/services";

export function AllCategorysServices({
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
      fetchData={getServiceCategorys}
      loadingMessage="Cargando Categorias..."
      noDataMessage="No hay Categorias"
      pageSize={size}
      searchFields={searchFieldsCategory}
      renderCard={(event) => (
        <CategoryCardBasic
          key={event.id}
          altText={event.service_category_image}
          imageUrl={event.service_category_image_url}
          linkUrl={`/services/category/${event.id}`}
          title={event.service_category_name}
        />
      )}
      title={infoComponent.title}
    />
  );
}
