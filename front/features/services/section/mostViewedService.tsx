"use client"
import { useApiRequest } from "@/hooks/useApiRequest";
import { CardServices } from "@/features/services/components/cardsServices";
import { TitleSection } from "@/components/utils/titleSection";
import { IUMostServiceViewed, IUService } from "@/interfaces/IUservices";
import { getMostViewedServices } from "../services/services";
export function MostViewedSServices() {
    const { data, error } = useApiRequest<IUMostServiceViewed>(getMostViewedServices);

    if (error) {
        return <div>Error al obtener los datos</div>;
    }

    if (!data) {
        return <div>Cargando...</div>;
    }
    return (
        <div>
            <TitleSection title="Servicios" description="más vistos" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-4">
                {data.most_viewed.map((service: IUService) => {
                    return <CardServices
                        key={service.id}
                        service={service}
                    />
                })}

            </div>
        </div>

    );
}