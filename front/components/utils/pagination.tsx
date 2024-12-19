import { Pagination, Button } from "@nextui-org/react";

interface PaginationComponentProps {
  pages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function PaginationComponent({ pages, currentPage, onPageChange }: PaginationComponentProps) {
  return (
    <div className="flex flex-col gap-5 items-center mt-4">
      <p className="text-small text-default-500">Página: {currentPage} de {pages}</p>
      <Pagination 
        color="secondary" 
        page={currentPage} 
        total={pages} 
        onChange={onPageChange} 
      />
      <div className="flex gap-2">
        <Button
          color="secondary"
          size="sm"
          variant="flat"
          onPress={() => onPageChange(currentPage > 1 ? currentPage - 1 : currentPage)}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <Button
          color="secondary"
          size="sm"
          variant="flat"
          onPress={() => onPageChange(currentPage < pages ? currentPage + 1 : currentPage)}
          disabled={currentPage === pages}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

