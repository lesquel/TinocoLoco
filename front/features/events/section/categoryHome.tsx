import { IUCategory, IUCategorys } from "@/interfaces/IUevents";
import { CategoryCard } from "../components/category";
import { useApiRequest } from "@/hooks/useApiRequest";
import { getCategorys } from "../services/events";
import { TitleSection } from "@/components/utils/titleSection";
import { useCallback } from "react";

export function CategoryHome() {
    const fetchCategorys = useCallback(() => getCategorys({size: 5}), []);
    const { data, error } = useApiRequest<IUCategorys>(fetchCategorys);

    if (error) {
        return <div>Error al obtener los datos</div>;
    }

    if (!data) {
        return <div>Cargando...</div>;
    }


    return (
        <div>
            <TitleSection title="Categorías" description="Eventos" />
            <div className="flex flex-wrap gap-4 mt-4 justify-evenly">
                {data.results.map((category: IUCategory) => {
                    return <CategoryCard category={category} key={category.id} />
                })}
            </div>
        </div>
    )
}