import { Input } from "@nextui-org/react";
import { Control, Controller } from "react-hook-form";
import { FieldConfig } from "@/interfaces/IUform";

export const TextForm = ({
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
      name={name}
      control={control}
      rules={config.validation}
      render={({ field: { onChange, value, ...fieldRest } }) => (
        <Input
          {...fieldRest}
          type="text"
          label={config.label}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    />
  );
};
