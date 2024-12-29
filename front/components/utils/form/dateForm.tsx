import { Input } from "@nextui-org/react";
import { Control, Controller } from "react-hook-form";

import { FieldConfig } from "@/interfaces/IUform";

export const DateForm = ({
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
          {...fieldRest} // Aquí agregamos todos los campos del controlador
          label={config.label}
          type="date"
          value={value ? value.toISOString().split("T")[0] : ""}
          onChange={(e) => {
            const date = new Date(e.target.value);

            onChange(date);
          }}
        />
      )}
      rules={config.validation}
    />
  );
};
