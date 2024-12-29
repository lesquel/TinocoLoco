"use client";
import { getServiceCategorys } from "../../../services/services/services";

import { SearchableListSection } from "@/components/sections/listComponent/searchListSection";
import { endPoints } from "@/config/endPoints";
import { IUCategory } from "@/interfaces/IUservices";
import { CategoryCardBasic } from "@/components/utils/categoryBasic";

export function CategoryDashboard() {
  return (
    <SearchableListSection<IUCategory>
      description="Eventos"
      endpoint={endPoints.services.category.get}
      errorMessage="Error al obtener las categorías"
      fetchData={getServiceCategorys}
      loadingMessage="Cargando categorías..."
      noDataMessage="No hay categorías"
      pageSize={5}
      renderCard={(category) => (
        <CategoryCardBasic
          key={category.id}
          altText={category.service_category_image}
          imageUrl={category.service_category_image_url}
          linkUrl={`dashboard/services/category/${category.id}`}
          title={category.service_category_name}
        />
      )}
      title="Categorías"
    />
  );
}
