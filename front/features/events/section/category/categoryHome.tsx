import { IUCategory, IUCategorys } from "@/interfaces/IUevents";
import { useApiRequest } from "@/hooks/useApiRequest";
import { getCategorys } from "../../services/events";
import { TitleSection } from "@/components/utils/titleSection";
import { useCallback } from "react";
import { CategoryCardBasic } from "@/components/utils/categoryBasic";

export function CategoryHome() {
  const fetchCategorys = useCallback(() => getCategorys({ size: 5 }), []);
  const { data, error } = useApiRequest<IUCategorys>(fetchCategorys);

  if (error) {
    return <div>Error al obtener los datos</div>;
  }

  if (!data) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <TitleSection title="Categorías" description="Eventos" />
      <div className="flex flex-nowrap gap-4 mt-4 justify-evenly w-full">
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
