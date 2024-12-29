"use client";
import {
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import { getBusiness } from "../services/businessServices";

import { useApiRequest } from "@/hooks/useApiRequest";
interface Data {
  key: string;
  value: string;
}
export const TableBusiness = () => {
  const { data, error } = useApiRequest(getBusiness);

  if (error) {
    return <div>Error al obtener la información de la empresa</div>;
  }

  if (!data) {
    return <div>Cargando...</div>;
  }

  const makeData: Data[] = Object.entries(data).map(([key, value]) => ({
    key,
    value: typeof value === "string" ? value : JSON.stringify(value),
  }));

  return (
    <Table aria-label="Información de la empresa" className="w-full">
      <TableHeader>
        <TableColumn className="text-center">Información</TableColumn>
        <TableColumn className="text-center">Detalle</TableColumn>
      </TableHeader>
      <TableBody>
        {makeData.map((item) => (
          <TableRow key={item.key}>
            <TableCell className="font-medium break-words">
              {item.key}
            </TableCell>
            <TableCell className="break-words">
              {item.key === "business_logo_url" ? (
                item.value != "null" ? (
                  <Image
                    alt="Logo de la empresa"
                    className="max-w-full h-auto"
                    src={item.value}
                  />
                ) : (
                  <div>No se ha cargado el logo</div>
                )
              ) : (
                item.value
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
