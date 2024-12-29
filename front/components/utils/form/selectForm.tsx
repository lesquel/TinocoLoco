import { Select, SelectItem } from "@nextui-org/react";
import { Control, Controller } from "react-hook-form";

import { FieldConfig } from "@/interfaces/IUform";

export const SelectForm = ({
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
        <Select
          {...field} // Propaga todos los valores de field (onChange, onBlur, ref, etc.)
          className="max-w-xs"
          label={config.label}
          placeholder={config.placeholder || `Select ${config.label}`}
          value={field.value || ""} // Asigna el valor de field
        >
          {config.options && config.options.length > 0 ? (
            config.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="">No hay opciones disponibles</SelectItem> // Mensaje si no hay opciones
          )}
        </Select>
      )}
      rules={config.validation}
    />
  );
};
