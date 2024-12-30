"use client";
import { SearchableTableSection } from "@/features/dashboard/section/allEvents";
import { getEvents } from "@/features/events/services/events";
import { IUEvent } from "@/interfaces/IUevents";

export default function DashboardEvents() {
  return (
    <SearchableTableSection<IUEvent>
      description="Los Eventos"
      pageSize={10}
      title="Todos"
      fetchData={getEvents}
      // endpoint={endPoints.events.get}
      columns={[
        { name: "Event ID", uid: "id" },
        { name: "Photos", uid: "photos" },
        { name: "Event Name", uid: "event_name" },
        { name: "Date", uid: "creation_date" },
        { name: "Description", uid: "event_description" },
        { name: "Status", uid: "is_active" },
        { name: "Actions", uid: "actions" },
      ]}
    />
  );
}
