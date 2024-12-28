"use client";
import { CardBasic } from "@/components/utils/cardBasic";
import { endPoints } from "@/config/endPoints";
import NoFountEvent from "@/public/images/no_fount_events.jpg";
import { getEvents } from "@/features/events/services/events";
import { IUEvent } from "@/interfaces/IUevents";
import { SearchableListSection } from "@/components/sections/listComponent/searchListSection";

export function AllEvents({
  size,
  infoComponent,
}: {
  size: number;
  infoComponent: { title: string; description: string };
}) {
  return (
    <SearchableListSection<IUEvent>
      endpoint={endPoints.events.get}
      title={infoComponent.title}
      description={infoComponent.description}
      fetchData={getEvents}
      renderCard={(event) => (
        <CardBasic
          key={event.id}
          item={event}
          url={"/events/"}
          imageKey="photos"
          titleKey="event_name"
          defaultImage={NoFountEvent.src}
          idKey="id"
        />
      )}
      pageSize={size}
      noDataMessage="No hay eventos"
      errorMessage="Error al obtener los eventos"
      loadingMessage="Cargando eventos..."
    />
  );
}
