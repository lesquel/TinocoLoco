"use client";
import { getMostViewedEvents } from "@/features/events/services/events";
import { useApiRequest } from "@/hooks/useApiRequest";
import { IUEvent, IUMostEventViewed } from "@/interfaces/IUevents";
import { TitleSection } from "@/components/utils/titleSection";
import { CardBasic } from "@/components/utils/cardBasic";
import NoFountServices from "@/public/images/no_fount_events.jpg";
import { CardLoagin } from "@/components/utils/loagins/cardLoagin";
export function MostViewedEvents() {
  const { data, error,isLoading } = useApiRequest<IUMostEventViewed>(getMostViewedEvents);

  if (error) {
    return <div>Error al obtener los datos</div>;
  }

  if (isLoading) {
    return <CardLoagin title="Eventos" description="más vistos" />;
  }

  if (!data?.results) {
    return <div>No hay eventos</div>;
  }
  return (
    <div>
      <TitleSection title="Eventos" description="más vistos" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {data.results.map((event: IUEvent) => {
          return (
            <CardBasic<IUEvent>
              key={event.id}
              item={event}
              url="/events"
              imageKey="photos"
              titleKey="event_name"
              defaultImage={NoFountServices.src}
              idKey="id"
            />
          );
        })}
      </div>
    </div>
  );
}
