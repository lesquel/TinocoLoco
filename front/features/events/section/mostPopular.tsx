"use client"
import { getMostPopularEvents } from "@/features/events/services/events";
import { useApiRequest } from "@/hooks/useApiRequest";
import { CardEvents } from "@/features/events/components/cardsEvents";
import { IUMostEventPopular, IUEvent } from "@/interfaces/IUevents";
import { TitleSection } from "@/components/utils/titleSection";
export function MostPopularEvents() {
    const { data, error } = useApiRequest<IUMostEventPopular>(getMostPopularEvents);

    if (error) {
        return <div>Error al obtener los datos</div>;
    }

    if (!data) {
        return <div>Cargando...</div>;
    }
    return (
        <div>
            <TitleSection title="Eventos" description="más populares" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-4">
                {data.most_popular.map((event: IUEvent) => {
                    return <CardEvents
                        key={event.id}
                        event={event}
                    />
                })}

            </div>
        </div>

    );
}