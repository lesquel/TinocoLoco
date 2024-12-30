"use client";
import { endPoints } from "@/config/endPoints";
import { SearchableListSection } from "@/components/sections/listComponent/searchListSection";
import { CardPromotions } from "../../components/CardPromotions";
import { IUPromotion } from "@/interfaces/IUPromotions";
import { getPromotions } from "../../services/promotions";
import { searchFieldsPromotions } from "../../utils/seacrFieldsPromotions";

export function AllPromotions({
  size,
  infoComponent,
}: {
  size: number;
  infoComponent: { title: string; description: string };
}) {
  return (
    <SearchableListSection<IUPromotion>
      description={infoComponent.description}
      endpoint={endPoints.promotions.get}
      errorMessage="Error al obtener los promociones"
      fetchData={getPromotions}
      loadingMessage="Cargando promociones..."
      noDataMessage="No hay promociones"
      pageSize={size}
      searchFields={searchFieldsPromotions}
      renderCard={(promotion) => (
        <CardPromotions
          key={promotion.id}
          promotion={promotion}
        />
      )}
      title={infoComponent.title}
    />
  );
}
