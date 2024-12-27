"use client";

import React, { useEffect, useState } from "react";
import { Button, Input, Textarea, Select, SelectItem } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { FieldConfig, FormConfig } from "@/interfaces/IUform";
import { CustomCheckbox } from "./checkboxForm";

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
    Object.entries(externalErrors).forEach(([fieldName, errorMessage]) => {
      setError(fieldName as keyof T, { type: "manual", message: errorMessage });
    });
  }, [externalErrors, setError]);

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
            {config.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        );
      case "file":
        return (
          <Input
            key={fieldName}
            {...commonProps}
            type="file"
            multiple
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
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full max-w-xs flex flex-col gap-4"
    >
      {Object.entries(formConfig).map(([fieldName, config]) => (
        <div key={fieldName}>
          {renderField(fieldName, config)}
          <div className="text-red-500 text-sm">{errors[fieldName]?.message}</div>
        </div>
      ))}
      <Button type="submit" variant="flat" className="mt-4">
        Guardar
      </Button>
    </form>
  );
};

export default DynamicForm;
