"use client"
import { getMostViewedEvents } from "@/features/events/services/events";
import { useApiRequest } from "@/hooks/useApiRequest";
import {IUEvent, IUMostEventViewed } from "@/interfaces/IUevents";
import { TitleSection } from "@/components/utils/titleSection";
import { CardBasic } from "@/components/utils/cardBasic";
import NoFountServices from "@/public/images/no_fount_events.jpg"
export function MostViewedEvents() {
    const { data, error } = useApiRequest<IUMostEventViewed>(getMostViewedEvents);

    if (error) {
        return <div>Error al obtener los datos</div>;
    }

    if (!data) {
        return <div>Cargando...</div>;
    }
    return (
        <div>
            <TitleSection title="Eventos" description="más vistos" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-4">
                {data.results.map((event: IUEvent) => { 
                    return <CardBasic<IUEvent>
                        key={event.id}
                        item={event}
                        url="/events"
                        imageKey="photos"
                        titleKey="event_name"
                        defaultImage={NoFountServices.src}
                        idKey="id"
                    />
                })}

            </div>
        </div>

    );
}