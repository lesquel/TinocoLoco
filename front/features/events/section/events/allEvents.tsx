"use client";
import { CardBasic } from "@/components/utils/cardBasic";
import { endPoints } from "@/config/endPoints";
import NoFountEvent from "@/public/images/no_fount_events.jpg";
import { getEvents } from "@/features/events/services/events";
import { IUEvent } from "@/interfaces/IUevents";
import { SearchableListSection } from "@/components/sections/listComponent/searchListSection";
import { searchFieldsEvent } from "../../utils/searchFielEvent";




export function AllEvents({
  size,
  infoComponent,
}: {
  size: number;
  infoComponent: { title: string; description: string };
}) {
  return (
    <SearchableListSection<IUEvent>
      description={infoComponent.description}
      endpoint={endPoints.events.get}
      errorMessage="Error al obtener los eventos"
      fetchData={getEvents}
      loadingMessage="Cargando eventos..."
      noDataMessage="No hay eventos"
      pageSize={size}
      searchFields={searchFieldsEvent}
      renderCard={(event) => (
        <CardBasic
          key={event.id}
          defaultImage={NoFountEvent.src}
          idKey="id"
          imageKey="photos"
          item={event}
          titleKey="event_name"
          url={"/events/"}
        />
      )}
      title={infoComponent.title}
    />
  );
}
