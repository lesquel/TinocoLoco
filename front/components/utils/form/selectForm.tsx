import { FieldConfig } from "@/interfaces/IUform";
import { Select, SelectItem } from "@nextui-org/react";
import { Control, Controller } from "react-hook-form";

export const SelectForm = ({ config, name, control }: { config: FieldConfig, name: string, control: Control<any> }) => {
  return (
    <Controller
      name={name as any}
      control={control}
      rules={config.validation}
      render={({ field }) => (
        <Select
          {...field} // Propaga todos los valores de field (onChange, onBlur, ref, etc.)
          label={config.label}
          value={field.value || ""} // Asigna el valor de field
          placeholder={config.placeholder || `Select ${config.label}`}
          className="max-w-xs"
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
    />
  );
};
