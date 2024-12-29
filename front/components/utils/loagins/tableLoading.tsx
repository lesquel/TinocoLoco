"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
} from "@nextui-org/react";

interface SkeletonTableProps {
  columns: number;
  rows: number;
}

export function TableLoading({ columns, rows }: SkeletonTableProps) {
  return (
    <Table aria-label="Skeleton table">
      <TableHeader>
        {Array.from({ length: columns }).map((_, index) => (
          <TableColumn key={`header-${index}`}>
            <Skeleton className="w-full h-4 rounded-lg" />
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={`row-${rowIndex}`}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                <Skeleton className="w-full h-4 rounded-lg" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
