import { Control, Controller } from "react-hook-form";
import { Textarea } from "@nextui-org/react";

import { FieldConfig } from "@/interfaces/IUform";

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
      control={control}
      name={name as any}
      render={({ field }) => (
        <Textarea
          {...field} // Propaga todos los valores de field (onChange, onBlur, ref, etc.)
          label={config.label}
          placeholder={config.placeholder || `Ingrese ${config.label}`} // Placeholder predeterminado
          value={field.value || ""} // Asegura que el valor sea una cadena vacía si no tiene valor
          onChange={(e) => field.onChange(e.target.value)} // Pasa el valor al controlador
        />
      )}
      rules={config.validation}
    />
  );
};
