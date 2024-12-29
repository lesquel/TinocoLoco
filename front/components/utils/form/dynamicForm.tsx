"use client";

import React, { useEffect, useState } from "react";
import { Button, Input, Textarea, Select, SelectItem } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";

import { CustomCheckbox } from "./checkboxForm";

import { FieldConfig, FormConfig } from "@/interfaces/IUform";

interface DynamicFormProps<T> {
  formConfig: FormConfig;
  onSubmit: (data: T, photos: File[]) => void;
  initialData?: Partial<T>;
  externalErrors?: Record<string, string>; // Manejo de errores externos
}

const DynamicForm = <T extends Record<string, any>>({
  formConfig,
  onSubmit,
  initialData = {},
  externalErrors = {},
}: DynamicFormProps<T>) => {
  const [photos, setPhotos] = useState<File[]>([]);
  const [generalErrors, setGeneralErrors] = useState<string[]>([]); // Para errores generales

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<T>({
    defaultValues: initialData,
  });

  // Actualizar errores externos
  useEffect(() => {
    const fieldErrors: Record<string, string> = {};
    const generalErrorsList: string[] = [];

    Object.entries(externalErrors).forEach(([fieldName, errorMessage]) => {
      if (formConfig[fieldName]) {
        // Si el campo existe en el formulario, se configura como un error específico
        setError(fieldName as keyof T, {
          type: "manual",
          message: errorMessage,
        });
      } else {
        // Si el campo no existe, se trata como un error general
        generalErrorsList.push(errorMessage);
      }
    });

    setGeneralErrors(generalErrorsList); // Actualizar errores generales
  }, [externalErrors, setError, formConfig]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);

      setPhotos(fileArray);
    }
  };

  const renderField = (fieldName: string, config: FieldConfig) => {
    const commonProps = {
      label: config.label,
      placeholder: config.placeholder,
      ...register(fieldName, {
        required: config.validation?.required,
        min: config.validation?.min,
        max: config.validation?.max,
        validate: config.validation?.pattern
          ? (value: string) => {
              const regex = new RegExp(config.validation!.pattern!.value);

              return regex.test(value) || config.validation!.pattern!.message;
            }
          : undefined,
      }),
    };

    switch (config.type) {
      case "text":
      case "number":
      case "date":
      case "time":
        return <Input key={fieldName} {...commonProps} type={config.type} />;
      case "textarea":
        return <Textarea key={fieldName} {...commonProps} />;
      case "select":
        return (
          <Select key={fieldName} {...commonProps}>
            {config.options ? (
              config.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))
            ) : (
              <SelectItem key={"a"}>No hay opciones disponibles</SelectItem> // Mensaje si no hay opciones
            )}
          </Select>
        );
      case "file":
        return (
          <Input
            key={fieldName}
            {...commonProps}
            multiple
            type="file"
            onChange={handleImageChange}
          />
        );
      case "checkbox":
        return (
          <Controller
            key={fieldName}
            control={control}
            name={fieldName}
            render={({ field }) => (
              <CustomCheckbox
                checked={!!field.value}
                onChange={(checked) => field.onChange(checked)}
              >
                {config.label}
              </CustomCheckbox>
            )}
          />
        );
      default:
        return null;
    }
  };

  const handleFormSubmit = (data: T) => {
    onSubmit(data, photos);
  };

  return (
    <form
      className="w-full max-w-xs flex flex-col gap-4"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {/* Sección de errores generales */}
      {generalErrors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md">
          <ul className="list-disc pl-5">
            {generalErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Renderizar campos del formulario */}
      {Object.entries(formConfig).map(([fieldName, config]) => (
        <div key={fieldName}>
          {renderField(fieldName, config)}
          <div className="text-red-500 text-sm">
            {errors[fieldName]?.message}
          </div>
        </div>
      ))}

      <Button className="mt-4" type="submit" variant="solid" color="danger">
        Guardar
      </Button>
    </form>
  );
};

export default DynamicForm;
