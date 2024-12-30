"use client";
import { getMostPopularEvents } from "@/features/events/services/events";
import { useApiRequest } from "@/hooks/useApiRequest";
import { IUMostEventPopular, IUEvent } from "@/interfaces/IUevents";
import { TitleSection } from "@/components/utils/titleSection";
import { CardBasic } from "@/components/utils/cardBasic";
import NoFountServices from "@/public/images/no_fount_events.jpg";
import { CardLoagin } from "@/components/utils/loagins/cardLoading";
import { useCallback } from "react";

export function MostPopularEvents() {
  const fecthEvent = useCallback(() => getMostPopularEvents({ size: 4 }), []);
  const { data, error, isLoading } =
    useApiRequest<IUMostEventPopular>(fecthEvent);

  if (error) {
    return <div>Error al obtener los datos</div>;
  }
  if (isLoading) {
    return <CardLoagin description="más populares" title="Eventos" />;
  }
  if (!data?.results) {
    return <div>No hay eventos</div>;
  }

  return (
    <div>
      <TitleSection description="más populares" title="Eventos" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {data.results.map((event: IUEvent) => {
          return (
            <CardBasic<IUEvent>
              key={event.id}
              defaultImage={NoFountServices.src}
              idKey="id"
              imageKey="photos"
              item={event}
              titleKey="event_name"
              url="/events"
            />
          );
        })}
      </div>
    </div>
  );
}
