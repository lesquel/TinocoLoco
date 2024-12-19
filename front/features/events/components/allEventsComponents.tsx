import { useCallback, useState } from "react";
import { getEvents } from "../services/events";
import { useApiRequest } from "@/hooks/useApiRequest";
import { IUEvent, IUEvents } from "@/interfaces/IUevents";
import { CardEvents } from "./cardsEvents";
import { PaginationComponent } from "@/components/utils/pagination";

export function AllEventsComponents({search}: { search: any }) {
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 1; 
    const fetchEvents = useCallback(() => getEvents({ page: currentPage, page_size: pageSize, ...search }), [currentPage, pageSize, search]);
    const { data, error, isLoading, refetch } = useApiRequest<IUEvents>(fetchEvents, [currentPage, pageSize, search]);

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
        return <div>No hay eventos</div>;
    }
    return (
        <>
            <div className="flex flex-wrap gap-4 mt-4 justify-evenly">
                {data?.results.map((event: IUEvent) => (
                    <CardEvents key={event.id} event={event} />
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