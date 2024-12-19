import { IUCategory } from "@/interfaces/IUservices";
import { useApiRequest } from "@/hooks/useApiRequest";
import { useCallback } from "react";
import { Chip } from "@nextui-org/react";
import { getCategory } from "../services/services";

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
            Category: {" "} 
            <Chip>
                {data.service_category_name.toUpperCase()}
            </Chip>
        </div>
    )
}