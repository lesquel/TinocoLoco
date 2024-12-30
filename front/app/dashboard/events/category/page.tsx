"use client";
import { useState } from "react";
import { SearchableTableSection } from "@/features/dashboard/section/SearchableTableSection";
import { getCategorys } from "@/features/events/services/events";
import { IUCategory } from "@/interfaces/IUevents";
import { SearchForm } from "@/components/utils/SearchForm";
import { searchFieldsCategory } from "@/features/events/utils/searchFielCategory";

export default function DashboardEvents() {
  const [searchParams, setSearchParams] = useState<any>({}); // Store search parameters

  const handleSearch = (searchData: any) => {
    setSearchParams(searchData); // Update search params when the user submits the form
  };

  return (
    <div>
      <SearchForm setSearch={handleSearch} searchFields={searchFieldsCategory} />
      <SearchableTableSection<IUCategory>
        pageSize={10}
        title="Todos las categorias de eventos"
        fetchData={getCategorys}
        added_url="events/eventcategory/"

        searchParams={searchParams} // Pass the search params here
        columns={[
          { name: "ID", uid: "id" },
          { name: "Foto", uid: "event_category_image_url" },
          { name: "Nombre del evento", uid: "event_category_name" },
          { name: "Fecha de creacion del evento", uid: "creation_date" },
          { name: "Descripción", uid: "event_category_description" },
          { name: "Estado", uid: "is_active" },
          { name: "Acciones", uid: "actions" },
        ]}
        onEdit={(item) => console.log("Editar evento", item)}
        onDelete={(item) => console.log("Eliminar evento", item)}
      />
    </div>
  );
}
