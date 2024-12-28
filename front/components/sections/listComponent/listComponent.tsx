"use client";
import { useCallback, useState } from "react";
import { useApiRequest } from "@/hooks/useApiRequest";
import { PaginationComponent } from "@/components/utils/pagination";

interface ListComponentProps<T> {
  fetchData: (params: {
    page: number;
    page_size: number;
    [key: string]: any;
  }) => Promise<{ count: number; results: T[] }>;
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

  const { data, error, isLoading, refetch } = useApiRequest<{
    count: number;
    results: T[];
  }>(fetchItems, [currentPage, pageSize, searchParams]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch();
  };

  if (error) {
    return <div>{errorMessage}</div>;
  }

  if (isLoading) {
    return <div>{loadingMessage}</div>;
  }

  if (data?.count === 0) {
    return <div>{noDataMessage}</div>;
  }

  return (
    <>
      <div className="flex flex-wrap gap-4 mt-4 justify-evenly">
        {data?.results.map((item) => renderCard(item))}
      </div>
      {data && (
        <PaginationComponent
          pages={Math.ceil(data.count / pageSize)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
