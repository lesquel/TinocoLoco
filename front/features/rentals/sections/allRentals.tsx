"use client";
import { useCallback, useState } from "react";

import { getMyRentals } from "../services/rentals";
import { CardRental } from "../components/cardRental";
import { PaginationComponent } from "@/components/utils/pagination";

import { useApiRequest } from "@/hooks/useApiRequest";
import { RentalCardLoading } from "@/components/utils/loagins/rentalsCardLoding";

interface PaginationResponse<T> {
  amount_of_pages: number;
  count: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  page_size: number;
  results: T[];
}

export function AllRentals() {
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const pageSize = 1;

  const fetchRentals = useCallback(
    () =>
      getMyRentals({ options: { page_size: pageSize, page: currentPage } }) as Promise<
        PaginationResponse<{ id: string;[key: string]: any }>
      >,
    [currentPage], // Dependencia para recargar los datos cuando la página cambie
  );

  const { data, error, isLoading } = useApiRequest<PaginationResponse<any>>(fetchRentals);

  const handlePageChange = (page: number) => {
    if (page >= 1 && data && page <= data.amount_of_pages) {
      setCurrentPage(page);
    }
  };

  if (error) {
    return <div>Error al obtener los datos</div>;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <RentalCardLoading />
        <RentalCardLoading />
        <RentalCardLoading />
        <RentalCardLoading />
      </div>
    );
  }

  if (!data?.results || data.results.length === 0) {
    return <div className="text-danger">No hay rentals</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.results.map((rental) => (
          <CardRental key={rental.id} rental={rental} />
        ))}
      </div>
      <PaginationComponent
        totalPages={data.amount_of_pages}
        currentPage={data.current_page}
        onPageChange={handlePageChange}
        hasNextPage={data.next !== null}
        hasPreviousPage={data.previous !== null}
      />
    </div>
  );
}
