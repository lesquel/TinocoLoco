import { Input } from "@nextui-org/react";
import { Control, Controller } from "react-hook-form";

import { FieldConfig } from "@/interfaces/IUform";

export const FileForm = ({
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
        <Input
          {...field} // Propaga los demás valores de field (onChange, onBlur, ref, etc.)
          multiple // Permite cargar varios archivos
          label={config.label}
          type="file"
          onChange={(e) => {
            const files = Array.from(
              (e.target as HTMLInputElement).files || [],
            );

            field.onChange(files); // Pasa los archivos a react-hook-form
          }}
        />
      )}
      rules={config.validation}
    />
  );
};
