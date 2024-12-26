import { FieldConfig } from "@/interfaces/IUform";
import { Control, Controller } from "react-hook-form";
import { Textarea } from "@nextui-org/react";

export const TextareaForm = ({
  config,
  name,
  control,
}: {
  config: FieldConfig;
  name: string;
  control: Control<any>;
}) => {
  return (
    <Controller
      name={name as any}
      control={control}
      rules={config.validation}
      render={({ field }) => (
        <Textarea
          {...field} // Propaga todos los valores de field (onChange, onBlur, ref, etc.)
          label={config.label}
          placeholder={config.placeholder || `Ingrese ${config.label}`} // Placeholder predeterminado
          value={field.value || ""} // Asegura que el valor sea una cadena vacía si no tiene valor
          onChange={(e) => field.onChange(e.target.value)} // Pasa el valor al controlador
        />
      )}
    />
  );
};
