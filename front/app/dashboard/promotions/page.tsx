"use client";
import { useState } from "react";
import { SearchableTableSection } from "@/features/dashboard/section/SearchableTableSection";
import { getPromotions } from "@/features/promotions/services/promotions";
import { IUPromotion } from "@/interfaces/IUPromotions";
import { SearchForm } from "@/components/utils/SearchForm";
import { searchFieldsPromotions } from "@/features/promotions/utils/seacrFieldsPromotions";

export default function DashboardEvents() {
  const [searchParams, setSearchParams] = useState<any>({});

  const handleSearch = (searchData: any) => {
    setSearchParams(searchData);
  };

  return (
    <div>
      <SearchForm setSearch={handleSearch} searchFields={searchFieldsPromotions} />
      <SearchableTableSection<IUPromotion>
        pageSize={10}
        title="Todas las promociones"
        fetchData={getPromotions}
        added_url="promotions/promotion/"
        searchParams={searchParams}
        columns={[
          { name: "ID", uid: "id" },
          { name: "Foto", uid: "promotion_image_url" },
          { name: "Nombre de la promocion", uid: "promotion_name" },
          { name: "Fecha del creacion", uid: "creation_date" },
          { name: "Descripción", uid: "promotion_description" },
          { name: "Porcentaje de descuento", uid: "promotion_discount_percentage" },
          { name: "Valido desde", uid: "valid_from" },
          { name: "Valido hasta", uid: "valid_until" },
          { name: "Estado", uid: "is_active" },
          { name: "Acciones", uid: "actions" },
        ]}
        onEdit={(item) => console.log("Editar evento", item)}
        onDelete={(item) => console.log("Eliminar evento", item)}
      />
    </div>
  );
}
