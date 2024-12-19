"use client"
import { useApiRequest } from "@/hooks/useApiRequest";
import { CardServices } from "@/features/services/components/cardsServices";
import { TitleSection } from "@/components/utils/titleSection";
import { IUMostServicePopular, IUService } from "@/interfaces/IUservices";
import { getMostPopularServices } from "../services/services";
export function MostPopularServices() {
    const { data, error } = useApiRequest<IUMostServicePopular>(getMostPopularServices);

    if (error) {
        return <div>Error al obtener los datos</div>;
    }

    if (!data) {
        return <div>Cargando...</div>;
    }
    return (
        <div>
            <TitleSection title="Servicios" description="más populares" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-4">
                {data.most_popular.map((service: IUService) => {
                    return <CardServices
                        key={service.id}
                        service={service}
                    />
                })}

            </div>
        </div>

    );
}