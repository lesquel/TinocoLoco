"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Pagination,
  Image,
  Card,
  CardHeader,
} from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import debounce from "lodash.debounce";

import No_fount_events from "@/public/images/no_fount_events.jpg";

interface SearchableTableSectionProps<T> {
  title: string;
  description: string;
  fetchData: (params: {
    page: number;
    page_size: number;
    [key: string]: any;
  }) => Promise<{ count: number; results: T[] }>;
  columns: { name: string; uid: string }[];
  pageSize?: number;
  noDataMessage?: string;
  errorMessage?: string;
  loadingMessage?: string;
}

export const SearchableTableSection = <T extends Record<string, any>>({
  title,
  description,
  fetchData,
  columns,
  pageSize = 10,
  noDataMessage = "No data available",
  errorMessage = "Error fetching data",
  loadingMessage = "Loading...",
}: SearchableTableSectionProps<T>) => {
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ count: number; results: T[] }>({
    count: 0,
    results: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pages = Math.ceil(data.count / pageSize);

  const loadData = useCallback(
    async (searchValue: string, pageNumber: number) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchData({
          page: pageNumber,
          page_size: pageSize,
          search: searchValue,
        });

        setData(result);
      } catch (err) {
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchData, pageSize, errorMessage],
  );

  // Debounced search handler
  const handleSearchChange = useMemo(
    () =>
      debounce((value: string) => {
        setPage(1); // Reset to the first page on search
        loadData(value, 1);
      }, 300),
    [loadData],
  );

  useEffect(() => {
    loadData(filterValue, page);
  }, [loadData, filterValue, page]);

  const renderCell = useCallback((item: T, columnKey: string) => {
    const value = item[columnKey];

    if (columnKey === "photos" && Array.isArray(value) && value.length > 0) {
      return (
        <Image
          alt="Item"
          className="w-16 h-16 object-cover rounded"
          src={value[0].image_url || No_fount_events.src}
        />
      );
    }

    return value ?? "-";
  }, []);

  const topContent = useMemo(
    () => (
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-default-500">{description}</p>
          </CardHeader>
        </Card>
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search..."
            startContent={<FaSearch className="text-default-400" />}
            value={filterValue}
            onValueChange={(value) => {
              setFilterValue(value);
              handleSearchChange(value);
            }}
          />
        </div>
      </div>
    ),
    [title, description, filterValue, handleSearchChange],
  );

  const bottomContent = useMemo(
    () => (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {data.count} items
        </span>
        <Pagination
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={(pageNumber) => setPage(pageNumber)}
        />
      </div>
    ),
    [data.count, page, pages],
  );

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
      classNames={{
        wrapper: "min-h-[222px]",
      }}
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
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
