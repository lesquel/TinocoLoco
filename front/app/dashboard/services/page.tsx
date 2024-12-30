"use client";
import { useState } from "react";
import { SearchableTableSection } from "@/features/dashboard/section/SearchableTableSection";
import { getServices } from "@/features/services/services/services";
import { IUService } from "@/interfaces/IUservices";
import { SearchForm } from "@/components/utils/SearchForm";
import { searchFieldsServices } from "@/features/services/utils/searchFielServices";

export default function DashboardEvents() {
  const [searchParams, setSearchParams] = useState<any>({}); 

  const handleSearch = (searchData: any) => {
    setSearchParams(searchData); 
  };

  return (
    <div>
      <SearchForm setSearch={handleSearch} searchFields={searchFieldsServices} />
      <SearchableTableSection<IUService>
        pageSize={10}
        title="Todos servicios"
        fetchData={getServices}
        added_url="services/service/"
        searchParams={searchParams} 
        columns={[
          { name: "ID", uid: "id" },
          { name: "Foto", uid: "photos" },
          { name: "Nombre del servicio", uid: "service_name" },
          { name: "Fecha del creacion", uid: "creation_date" },
          { name: "Descripción", uid: "service_description" },
          { name: "Precio unitario", uid: "service_unitary_cost" },
          { name: "Estado", uid: "is_active" },
          { name: "Acciones", uid: "actions" },
        ]}
        onEdit={(item) => console.log("Editar evento", item)}
        onDelete={(item) => console.log("Eliminar evento", item)}
      />
    </div>
  );
}
