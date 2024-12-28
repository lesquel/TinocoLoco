import { FieldConfig } from "@/interfaces/IUform";
import { Input } from "@nextui-org/react";
import { Control, Controller } from "react-hook-form";

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
      name={name as any}
      control={control}
      rules={config.validation}
      render={({ field }) => (
        <Input
          {...field} // Propaga los demás valores de field (onChange, onBlur, ref, etc.)
          type="file"
          label={config.label}
          onChange={(e) => {
            const files = Array.from(
              (e.target as HTMLInputElement).files || [],
            );
            field.onChange(files); // Pasa los archivos a react-hook-form
          }}
          multiple // Permite cargar varios archivos
        />
      )}
    />
  );
};
