"use client";
import { useState } from "react";
import { SearchableTableSection } from "@/features/dashboard/section/SearchableTableSection";
import { getEvents } from "@/features/events/services/events";
import { IUEvent } from "@/interfaces/IUevents";
import { SearchForm } from "@/components/utils/SearchForm";
import { searchFieldsEvent } from "@/features/events/utils/searchFielEvent";

export default function DashboardEvents() {
  const [searchParams, setSearchParams] = useState<any>({}); // Store search parameters

  const handleSearch = (searchData: any) => {
    setSearchParams(searchData); // Update search params when the user submits the form
  };

  return (
    <div>
      <SearchForm setSearch={handleSearch} searchFields={searchFieldsEvent} />
      <SearchableTableSection<IUEvent>
        pageSize={10}
        title="Todos Los Eventos"
        added_url="events/event/"

        fetchData={getEvents}
        searchParams={searchParams} // Pass the search params here
        columns={[
          { name: "ID", uid: "id" },
          { name: "Foto", uid: "photos" },
          { name: "Nombre del evento", uid: "event_name" },
          { name: "Fecha del evento", uid: "creation_date" },
          { name: "Descripción", uid: "event_description" },
          { name: "Estado", uid: "is_active" },
          { name: "Acciones", uid: "actions" },
        ]}
        onEdit={(item) => window.open(`${URL_BACKEND}${added_url}add/`, "_blank")}
        onDelete={(item) => console.log("Eliminar evento", item)}
      />
    </div>
  );
}
