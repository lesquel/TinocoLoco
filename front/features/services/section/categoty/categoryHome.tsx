import { useCallback } from "react";

import { getServiceCategorys } from "@/features/services/services/services";

import { IUCategory, IUCategorys } from "@/interfaces/IUservices";
import { useApiRequest } from "@/hooks/useApiRequest";
import { TitleSection } from "@/components/utils/titleSection";
import { CategoryCardBasic } from "@/components/utils/categoryBasic";
import { CardLoagin } from "@/components/utils/loagins/cardLoading";

export function CategoryHomeServices() {
  const fetchCategorys = useCallback(() => getServiceCategorys({ page_size: 4 }), []);
  const { data, error, isLoading } = useApiRequest<any>(fetchCategorys);

  if (error) {
    return <div>Error al obtener los datos</div>;
  }

  if (isLoading) {
    return <CardLoagin description="Servicios" title="Categorías" />;
  }

  if (!data?.results) {
    return <div>No hay categorías</div>;
  }

  return (
    <div>
      <TitleSection description="Servicios" title="Categorías" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {data.results.map((category: IUCategory) => (
          <CategoryCardBasic
            key={category.id}
            altText={category.service_category_image}
            imageUrl={category.service_category_image_url}
            linkUrl={`/services/category/${category.id}`}
            title={category.service_category_name}
          />
        ))}
      </div>
    </div>
  );
}
