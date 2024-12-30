"use client";
import { useState } from "react";
import { SearchableTableSection } from "@/features/dashboard/section/SearchableTableSection";
import { getServiceCategorys } from "@/features/services/services/services";
import { IUCategory } from "@/interfaces/IUservices";
import { SearchForm } from "@/components/utils/SearchForm";
import { searchFieldsCategory } from "@/features/services/utils/searchFielCategory";

export default function DashboardEvents() {
  const [searchParams, setSearchParams] = useState<any>({}); 

  const handleSearch = (searchData: any) => {
    setSearchParams(searchData); 
  };

  return (
    <div>
      <SearchForm setSearch={handleSearch} searchFields={searchFieldsCategory} />
      <SearchableTableSection<IUCategory>
        pageSize={10}
        title="Todas las categorias"
        fetchData={getServiceCategorys}
        searchParams={searchParams} 
        columns={[
          { name: "ID", uid: "id" },
          { name: "Foto", uid: "service_category_image_url" },
          { name: "Nombre de la categoria", uid: "service_category_name" },
          { name: "Fecha del creacion", uid: "creation_date" },
          { name: "Descripción", uid: "service_category_description" },
          { name: "Estado", uid: "is_active" },
          { name: "Acciones", uid: "actions" },
        ]}
        onEdit={(item) => console.log("Editar evento", item)}
        onDelete={(item) => console.log("Eliminar evento", item)}
      />
    </div>
  );
}
