import { IUPromotions } from "@/interfaces/IUPromotions";
import { getMostPopularPromotions } from "../../services/promotions";
import { useApiRequest } from "@/hooks/useApiRequest";
import { useCallback } from "react";
import {
  CardLoadingBasic,
  CardLoagin,
} from "@/components/utils/loagins/cardLoading";
import { TitleSection } from "@/components/utils/titleSection";
import { CardPromotions } from "../../components/CardPromotions";

export function MostPopularPromotions() {
  const fetchPromotions = useCallback(
    () => getMostPopularPromotions({ size: 4 }),
    []
  );
  const { data, error, isLoading } =
    useApiRequest<IUPromotions>(fetchPromotions);
  if (error) {
    return <div>Error al obtener los datos</div>;
  }

  if (isLoading) {
    return <CardLoagin description="Promociones" title="Mas populares" />;
  }

  if (!data?.results) {
    return <div>No hay promociones</div>;
  }

  return <div>
    <TitleSection title="Promociones" description="Más populares" />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {data.results.map((promotion) => (
        <CardPromotions key={promotion.id} promotion={promotion} />
      ))}
    </div>
  </div>;
}
