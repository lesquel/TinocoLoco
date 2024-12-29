import { Input } from "@nextui-org/react";
import { Control, Controller } from "react-hook-form";

import { FieldConfig } from "@/interfaces/IUform";

export const NumberForm = ({
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
      render={({ field: { onChange, value, ...fieldRest } }) => (
        <Input
          {...fieldRest} // Propaga el resto de los valores de field (onChange, onBlur, ref, etc.)
          label={config.label}
          type="number"
          value={value || ""} // Asegura que el valor esté en un formato correcto para el campo de número
          onChange={(e) => {
            const numberValue = Number(e.target.value); // Convierte el valor a número

            onChange(numberValue); // Pasa el valor numérico a react-hook-form
          }}
        />
      )}
      rules={config.validation}
    />
  );
};
