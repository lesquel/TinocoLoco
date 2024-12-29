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

interface SearchField {
  key: string;
  value: string;
  label: string;
}

interface SearchFormProps {
  setSearch: (searchData: any) => void;
  searchFields: SearchField[];
}

export function SearchForm({ setSearch, searchFields }: SearchFormProps) {
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
                className="flex-1"
                label="Buscar"
                placeholder="Ingrese el valor a buscar"
              />
            )}
          />
          <Controller
            control={control}
            defaultValue={searchFields[0]?.value || ""}
            name="searchField"
            render={({ field }) => (
              <Select
                {...field}
                className="w-52"
                defaultSelectedKeys={[searchFields[0]?.value || ""]}
                label="Campos de Búsqueda"
                placeholder="Seleccione un campo"
              >
                {searchFields.map(({ key, value, label }) => (
                  <SelectItem key={key} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </Select>
            )}
          />

          <Button className="" color="danger" type="submit">
            <FaSearch className="w-5 h-5" />
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
