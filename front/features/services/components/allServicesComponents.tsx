import { useCallback, useState } from "react";
import { getServices } from "@/features/services/services/services";
import { useApiRequest } from "@/hooks/useApiRequest";
import { IUEvent } from "@/interfaces/IUevents";
import { PaginationComponent } from "@/components/utils/pagination";
import { IUService, IUServices } from "@/interfaces/IUservices";
import { CardServices } from "./cardsServices";

export function AllServicesComponents({search}: { search: any }) {
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 1; 
    const fetchServices = useCallback(() => getServices({ page: currentPage, page_size: pageSize, ...search }), [currentPage, pageSize, search]);
    const { data, error, isLoading, refetch } = useApiRequest<IUServices>(fetchServices, [currentPage, pageSize, search]);

    if (error) {
        return <div>Error al obtener los datos</div>;
    }

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        refetch();
    };

    if (data?.count === 0) {
        return <div>No hay servicios</div>;
    }
    return (
        <>
            <div className="flex flex-wrap gap-4 mt-4 justify-evenly">
                {data?.results.map((service: IUService) => (
                    <CardServices key={service.id} service={service} />
                ))}
            </div>
            {data && (
                <PaginationComponent
                    pages={Math.ceil(data.count / pageSize)}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    )
}