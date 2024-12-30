"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { Input, Button, Card, CardBody, Select, SelectItem } from "@nextui-org/react"
import { FaSearch } from "react-icons/fa"

interface FormData {
  searchValue: string
  searchField: string
}

interface SearchField {
  key: string
  value: string
  label: string
}

interface SearchFormProps {
  setSearch: (searchData: any) => void
  searchFields: SearchField[]
}

export function SearchForm({ setSearch, searchFields }: SearchFormProps) {
  const { control, handleSubmit } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    const { searchField, searchValue } = data
    const makeUrl = {
      [searchField]: searchValue,
    }

    console.log("search makeUrl", makeUrl)
    setSearch(makeUrl)
  }

  return (
    <Card className="w-3/4 sm:w-full max-w-3xl mx-auto flex-1">
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4">
          <Controller
            control={control}
            defaultValue=""
            name="searchValue"
            render={({ field }) => (
              <Input
                {...field}
                className="flex-grow"
                placeholder="Ingrese el valor a buscar"
                startContent={<FaSearch className="text-default-400" />}
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
                className="w-full sm:w-48"
                defaultSelectedKeys={[searchFields[0]?.value || ""]}
                aria-label="Campos de Búsqueda"
              >
                {searchFields.map(({ key, value, label }) => (
                  <SelectItem key={key} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          <Button color="danger"  type="submit" className="w-full sm:w-auto">
            Buscar
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}

