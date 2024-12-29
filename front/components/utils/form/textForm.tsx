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
      control={control}
      name={name}
      render={({ field: { onChange, value, ...fieldRest } }) => (
        <Input
          {...fieldRest}
          label={config.label}
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      rules={config.validation}
    />
  );
};
