import { IUCategory } from "@/interfaces/IUevents";
import { getCategory, getCategorys } from "../services/events";
import { useApiRequest } from "@/hooks/useApiRequest";
import { useCallback } from "react";
import { Chip } from "@nextui-org/react";

export function ChipCategory({ idCategory }: { idCategory: number }) {
    const fetchCategory = useCallback(() => getCategory(idCategory), [idCategory]);
    const { data, error } = useApiRequest<IUCategory>(fetchCategory);

    if (error) {
        return <div>Error al obtener los datos</div>;
    }

    if (!data) {
        return <div>Cargando...</div>;
    }
    return (
        <div>
            Categoría: {" "} 
            <Chip>
                {data.event_category_name.toUpperCase()}
            </Chip>
        </div>
    )
}