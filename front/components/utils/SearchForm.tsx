"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Input,
  Button,
  Card,
  CardBody,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
interface FormData {
  searchValue: string;
  searchField: string;
}

export function SearchForm({ setSearch }: { setSearch: any }) {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const { searchField, searchValue } = data;
    const makeUrl = {
      [searchField]: searchValue,
    };

    console.log("search makeUrl", makeUrl);
    setSearch(makeUrl);
  };

  return (
    <Card className="w-full mx-auto flex-1">
      <CardBody>
        <form
          className="flex flex-wrap gap-4 justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            defaultValue=""
            name="searchValue"
            render={({ field }) => (
              <Input
                {...field}
                className="flex-1 "
                label="Buscar"
                placeholder="Ingrese el valor a buscar"
              />
            )}
          />
          <Controller
            control={control}
            defaultValue="name"
            name="searchField"
            render={({ field }) => (
              <Select
                {...field}
                className="w-52"
                defaultSelectedKeys={["name"]}
                label="Campos de Búsqueda"
                placeholder="Select field"
              >
                <SelectItem key="name" value="name">
                  Nombre
                </SelectItem>
                <SelectItem key="description" value="description">
                  Descripcion
                </SelectItem>
                <SelectItem key="category" value="category">
                  Categoria
                </SelectItem>
                <SelectItem
                  key="min_reference_value"
                  value="min_reference_value"
                >
                  Valor de Referencia Mínimo
                </SelectItem>
                <SelectItem
                  key="max_reference_value"
                  value="max_reference_value"
                >
                  Valor de Referencia Máximo
                </SelectItem>
                <SelectItem key="min_allowed_hours" value="min_allowed_hours">
                  Horas Permitidas Mínimas
                </SelectItem>
                <SelectItem key="max_allowed_hours" value="max_allowed_hours">
                  Horas Permitidas Máximas
                </SelectItem>
                <SelectItem key="extra_hour_rate" value="extra_hour_rate">
                  Tarifa de Hora Extra
                </SelectItem>
              </Select>
            )}
          />

          <Button className="" color="primary" type="submit">
            <FaSearch className="w-5 h-5" />
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
