import { useCallback } from "react";

import { getCategorys } from "../../services/events";

import { IUCategory, IUCategorys } from "@/interfaces/IUevents";
import { useApiRequest } from "@/hooks/useApiRequest";
import { TitleSection } from "@/components/utils/titleSection";
import { CategoryCardBasic } from "@/components/utils/categoryBasic";
import { CardLoagin } from "@/components/utils/loagins/cardLoading";

export function CategoryHome() {
  const fetchCategorys = useCallback(() => getCategorys({ page_size: 4 }), []);
  const { data, error, isLoading } = useApiRequest<IUCategorys>(fetchCategorys);

  if (error) {
    return <div>Error al obtener los datos</div>;
  }

  if (isLoading) {
    return <CardLoagin description="Eventos" title="Categorías" />;
  }

  if (!data?.results) {
    return <div>No hay categorías</div>;
  }

  return (
    <div>
      <TitleSection description="Eventos" title="Categorías" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {data.results.map((category: IUCategory) => (
          <CategoryCardBasic
            key={category.id}
            altText={category.event_category_image}
            imageUrl={category.event_category_image_url}
            linkUrl={`/events/category/${category.id}`}
            title={category.event_category_name}
          />
        ))}
      </div>
    </div>
  );
}
