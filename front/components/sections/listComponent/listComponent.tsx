"use client";

import { useCallback, useState } from "react";
import { Spacer } from "@nextui-org/react";

import { useApiRequest } from "@/hooks/useApiRequest";
import { PaginationComponent } from "@/components/utils/pagination";
import { CardLoagin } from "@/components/utils/loagins/cardLoading";

interface PaginationResponse<T> {
  amount_of_pages: number;
  count: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  page_size: number;
  results: T[];
}

interface ListComponentProps<T> {
  fetchData: (params: {
    page: number;
    page_size: number;
    [key: string]: any;
  }) => Promise<PaginationResponse<T>>;
  renderCard: (item: T) => JSX.Element;
  searchParams?: { [key: string]: any };
  pageSize?: number;
  noDataMessage?: string;
  errorMessage?: string;
  loadingMessage?: string;
}
export function ListComponent<T>({
  fetchData,
  renderCard,
  searchParams = {},
  pageSize = 10,
  noDataMessage = "No hay datos",
  errorMessage = "Error al obtener los datos",
  loadingMessage = "Cargando...",
}: ListComponentProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchItems = useCallback(
    () =>
      fetchData({ page: currentPage, page_size: pageSize, ...searchParams }),
    [currentPage, pageSize, searchParams, fetchData],
  );

  const { data, error, isLoading } = useApiRequest<PaginationResponse<T>>(
    fetchItems,
    [currentPage, pageSize, searchParams],
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && data && page <= data.amount_of_pages) {
      setCurrentPage(page);
    }
  };

  if (error) {
    return <div>{errorMessage}</div>;
  }

  if (isLoading) {
    return (
      <div>
        <CardLoagin />
        <Spacer y={4} />
        <CardLoagin />
      </div>
    );
  }

  if (!data?.results?.length) {
    return <div>{noDataMessage}</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {data.results.map((item, index) => (
          <div key={index}>{renderCard(item)}</div>
        ))}
      </div>
      {data && (
        <PaginationComponent
          currentPage={currentPage}
          hasNextPage={data.next !== null}
          hasPreviousPage={data.previous !== null}
          totalPages={data.amount_of_pages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
