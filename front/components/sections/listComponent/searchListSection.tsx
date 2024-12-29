"use client";
import { useState } from "react";

import { TitleSection } from "@/components/utils/titleSection";
import { SearchForm } from "@/components/utils/SearchForm";
import { ListComponent } from "@/components/sections/listComponent/listComponent";

interface SearchField {
  key: string;
  value: string;
  label: string;
}
interface SearchableListSectionProps<T> {
  title: string;
  description: string;
  fetchData: (params: {
    page: number;
    page_size: number;
    [key: string]: any;
  }) => Promise<{ count: number; results: T[] }>;
  renderCard: (item: T) => JSX.Element;
  endpoint: string;
  pageSize?: number;
  noDataMessage?: string;
  errorMessage?: string;
  loadingMessage?: string;
  searchFields: SearchField[];
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
  searchFields,
}: SearchableListSectionProps<T>) {
  const [search, setSearch] = useState<any>({});

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-center items-center ">
        <TitleSection description={description} title={title} />
        <SearchForm setSearch={setSearch} searchFields={searchFields} />
      </div>
      <ListComponent<T>
        errorMessage={errorMessage}
        fetchData={fetchData}
        loadingMessage={loadingMessage}
        noDataMessage={noDataMessage}
        pageSize={pageSize}
        renderCard={renderCard}
        searchParams={search}
      />
    </div>
  );
}
