import { IUPromotions } from "@/interfaces/IUPromotions";
import { getMostViewedPromotions } from "../../services/promotions";
import { useApiRequest } from "@/hooks/useApiRequest";
import { useCallback } from "react";
import {
  CardLoadingBasic,
  CardLoagin,
} from "@/components/utils/loagins/cardLoading";
import { TitleSection } from "@/components/utils/titleSection";
import { CardPromotions } from "../../components/CardPromotions";

export function MostViewedPromotions() {
  const fetchPromotions = useCallback(
    () => getMostViewedPromotions({ size: 4 }),
    []
  );
  const { data, error, isLoading } =
    useApiRequest<IUPromotions>(fetchPromotions);
  if (error) {
    return <div>Error al obtener los datos</div>;
  }

  if (isLoading) {
    return <CardLoagin description="Promociones" title="Mas vistas" />;
  }

  if (!data?.results) {
    return <div>No hay promociones</div>;
  }

  return <div>
    <TitleSection title="Promociones" description="Más vistas" />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {data.results.map((promotion) => (
        <CardPromotions key={promotion.id} promotion={promotion} />
      ))}
    </div>
  </div>;
}
