import { IUCategory, IUCategorys } from "@/interfaces/IUevents";
import { useApiRequest } from "@/hooks/useApiRequest";
import { getCategorys } from "../../services/events";
import { TitleSection } from "@/components/utils/titleSection";
import { useCallback } from "react";
import { CategoryCardBasic } from "@/components/utils/categoryBasic";
import { CardLoagin } from "@/components/utils/loagins/cardLoading";

export function CategoryHome() {
  const fetchCategorys = useCallback(() => getCategorys({ size: 5 }), []);
  const { data, error, isLoading } = useApiRequest<IUCategorys>(fetchCategorys);

  if (error) {
    return <div>Error al obtener los datos</div>;
  }

  if (isLoading) {
    return <CardLoagin title="Categorías" description="Eventos" />;
  }

  if (!data?.results){
    return <div>No hay categorías</div>;
  }


  return (
    <div>
      <TitleSection title="Categorías" description="Eventos" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {data.results.map((category: IUCategory) => (
          <CategoryCardBasic
            key={category.id}
            imageUrl={category.event_category_image_url}
            altText={category.event_category_image}
            title={category.event_category_name}
            linkUrl={`/events/category/${category.id}`}
          />
        ))}
      </div>
    </div>
  );
}
