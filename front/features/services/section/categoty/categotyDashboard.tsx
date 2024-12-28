"use client";
import { SearchableListSection } from "@/components/sections/listComponent/searchListSection";
import { endPoints } from "@/config/endPoints";
import { IUCategory } from "@/interfaces/IUservices";
import { getServiceCategorys } from "../../../services/services/services";
import { CategoryCardBasic } from "@/components/utils/categoryBasic";

export function CategoryDashboard() {
  return (
    <SearchableListSection<IUCategory>
      endpoint={endPoints.services.category.get}
      title="Categorías"
      description="Eventos"
      fetchData={getServiceCategorys}
      renderCard={(category) => (
        <CategoryCardBasic
          key={category.id}
          imageUrl={category.service_category_image_url}
          altText={category.service_category_image}
          title={category.service_category_name}
          linkUrl={`dashboard/services/category/${category.id}`}
        />
      )}
      pageSize={5}
      noDataMessage="No hay categorías"
      errorMessage="Error al obtener las categorías"
      loadingMessage="Cargando categorías..."
    />
  );
}
