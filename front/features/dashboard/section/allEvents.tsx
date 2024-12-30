"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Image, Card, CardHeader } from "@nextui-org/react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importa los iconos
// import debounce from "lodash.debounce";

import No_fount_events from "@/public/images/no_fount_events.jpg";

interface SearchableTableSectionProps<T> {
  title: string;
  description: string;
  fetchData: (params: { page: number; page_size: number; [key: string]: any }) => Promise<{ count: number; results: T[] }>;
  columns: { name: string; uid: string }[];
  pageSize?: number;
  noDataMessage?: string;
  errorMessage?: string;
  loadingMessage?: string;
  searchParams: any; 
  onEdit: (item: T) => void; // Callback para la acción de editar
  onDelete: (item: T) => void; // Callback para la acción de eliminar
}

export const SearchableTableSection = <T extends Record<string, any>>({
  title,
  description,
  fetchData,
  columns,
  pageSize = 10,
  noDataMessage = "No hay datos para mostrar",
  errorMessage = "Ocurrió un error al cargar los datos",
  loadingMessage = "Cargando...",
  searchParams,
  onEdit,
  onDelete,
}: SearchableTableSectionProps<T>) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ count: number; results: T[] }>({ count: 0, results: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pages = Math.ceil(data.count / pageSize);

  const loadData = useCallback(
    async (searchParams: any, pageNumber: number) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchData({
          page: pageNumber,
          page_size: pageSize,
          ...searchParams, // Spread search params here
        });

        setData(result);
      } catch (err) {
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchData, pageSize, errorMessage]
  );

  useEffect(() => {
    loadData(searchParams, page);
  }, [loadData, searchParams, page]); // Reload data when searchParams or page changes

  const renderCell = useCallback((item: T, columnKey: keyof T) => {
    const value = item[columnKey];
    if (columnKey === "photos"  && Array.isArray(value) && value.length > 0) {
      return <Image alt="Item" className="w-16 h-16 object-cover rounded" src={value[0].image_url || No_fount_events.src} />;
    }
    if (columnKey === "event_category_image_url" ) {
      return <Image alt="Item" className="w-16 h-16 object-cover rounded" src={item[columnKey] || No_fount_events.src} />;
    }
    return value ?? "-";
  }, []);

  const topContent = useMemo(() => (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-default-500">{description}</p>
        </CardHeader>
      </Card>
    </div>
  ), [title, description]);

  const bottomContent = useMemo(() => (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="text-default-400 text-small">{data.count} resultados totales </span>
      <Pagination
        showControls
        showShadow
        color="danger"
        page={page}
        total={pages}
        onChange={(pageNumber) => setPage(pageNumber)}
      />
    </div>
  ), [data.count, page, pages]);

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  if (isLoading) {
    return <div className="text-default-500">{loadingMessage}</div>;
  }

  return (
    <Table
      aria-label="Data table"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{ wrapper: "min-h-[222px]" }}
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={noDataMessage} items={data.results}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "actions" ? (
                  <div className="flex space-x-2">
                    <button onClick={() => onEdit(item)} title="Editar" className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                    <button onClick={() => onDelete(item)} title="Eliminar" className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </div>
                ) : (
                  renderCell(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
