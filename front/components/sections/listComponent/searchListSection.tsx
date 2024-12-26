"use client";
import { useState } from "react";
import { TitleSection } from "@/components/utils/titleSection";
import { SearchForm } from "@/components/utils/SearchForm";
import { ListComponent } from "@/components/sections/listComponent/lisComponent";

interface SearchableListSectionProps<T> {
  title: string;
  description: string;
  fetchData: (params: { page: number; page_size: number; [key: string]: any }) => Promise<{ count: number; results: T[] }>;
  renderCard: (item: T) => JSX.Element;
  endpoint: string;
  pageSize?: number;
  noDataMessage?: string;
  errorMessage?: string;
  loadingMessage?: string;
}

export function SearchableListSection<T>({
  title,
  description,
  fetchData,
  renderCard,
  pageSize = 10,
  noDataMessage = "No hay datos",
  errorMessage = "Error al obtener los datos",
  loadingMessage = "Cargando...",
}: SearchableListSectionProps<T>) {
  const [search, setSearch] = useState<any>({});

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-center items-center ">
        <TitleSection title={title} description={description} />
        <SearchForm setSearch={setSearch} />
      </div>
      <ListComponent<T>
        fetchData={fetchData}
        renderCard={renderCard}
        searchParams={search}
        pageSize={pageSize}
        noDataMessage={noDataMessage}
        errorMessage={errorMessage}
        loadingMessage={loadingMessage}
      />
    </div>
  );
}