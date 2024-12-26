"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { FieldConfig, FormConfig } from "@/interfaces/IUform";
import { CustomCheckbox } from "./checkboxForm";



interface DynamicFormProps<T> {
  formConfig: FormConfig;
  onSubmit: (data: T, photos: File[]) => void;
  initialData?: Partial<T>;
}

const DynamicForm = <T extends Record<string, any>>({
  formConfig,
  onSubmit,
  initialData = {},
}: DynamicFormProps<T>) => {
  const [isClient, setIsClient] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<T>({
    defaultValues: initialData,
  });

  useEffect(() => {
    setIsClient(true); // Asegura que el componente se renderiza en el cliente
  }, []);

  // Manejo de cambio de imágenes
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setPhotos(fileArray);
    }
  };

  // Renderizar campos dinámicamente
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
        return <Input {...commonProps} type={config.type} />;
      case "textarea":
        return <Textarea {...commonProps} />;
      case "select":
        return (
          <Select {...commonProps}>
            {config.options ? (
              config.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))
            ) : (
              <SelectItem key="none" value="">
                No hay opciones disponibles
              </SelectItem>
            )}
          </Select>
        );
      case "file":
        return (
          <Input
            {...commonProps}
            type="file"
            multiple
            onChange={handleImageChange}
          />
        );
      case "checkbox":
        return (
          <Controller
            control={control}
            name={fieldName}
            render={({ field }) => (
              <CustomCheckbox
                checked={!!field.value} // Asegura que el valor sea booleano
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

  if (!isClient) {
    return null; // Evitar renderizar en el servidor
  }

  const handleFormSubmit = (data: T) => {
    console.log("photos:", photos);
    const finalData = { ...data, photos }; // Combina los datos del formulario con las fotos
    onSubmit(finalData, photos); // Envía tanto los datos como los archivos
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full max-w-xs flex flex-col gap-4"
    >
      {Object.keys(formConfig).map((fieldName) => {
        const config = formConfig[fieldName];
        return (
          <div key={fieldName}>
            {renderField(fieldName, config)}
            <div className="text-red-500 text-sm">
              {errors[fieldName]?.message || ""}
            </div>
          </div>
        );
      })}
      <Button type="submit" variant="flat" className="mt-4">
        Guardar
      </Button>
    </form>
  );
};

export default DynamicForm;
