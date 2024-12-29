'use client'

import { Pagination, Button } from "@nextui-org/react";

interface PaginationComponentProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
export function PaginationComponent({
  totalPages,
  currentPage,
  onPageChange,
  hasNextPage,
  hasPreviousPage,
}: PaginationComponentProps) {
  return (
    <div className="flex flex-col gap-5 items-center mt-4">
      <p className="text-small text-default-500">
        Página: {currentPage} de {totalPages}
      </p>
      <Pagination
        color="danger"
        page={currentPage}
        total={totalPages}
        onChange={onPageChange} // Asegura la correcta actualización del estado
      />
      <div className="flex gap-2">
        <Button
          className="bg-rose-500"
          size="sm"
          variant="flat"
          onPress={() => onPageChange(currentPage - 1)}
          disabled={!hasPreviousPage}
        >
          Anterior
        </Button>
        <Button
          className="bg-rose-500"
          size="sm"
          variant="flat"
          onPress={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
