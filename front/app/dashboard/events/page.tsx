"use client";
import { SearchableTableSection } from "@/features/dashboard/section/allEvents";
import { getEvents } from "@/features/events/services/events";
import { IUEvent } from "@/interfaces/IUevents";

export default function DashboardEvents() {
  return (
    <SearchableTableSection<IUEvent>
      description=""
      pageSize={10}
      title="Todos Los Eventos"
      fetchData={getEvents}
      // endpoint={endPoints.events.get}
      columns={[
        { name: "ID", uid: "id" },
        { name: "Foto", uid: "photos" },
        { name: "Nombre del evento", uid: "event_name" },
        { name: "Fecha del evento", uid: "creation_date" },
        { name: "Descripcion", uid: "event_description" },
        { name: "Estado", uid: "is_active" },
        { name: "Acciones", uid: "actions" },
      ]}
    />
  );
}
