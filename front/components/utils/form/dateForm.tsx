import { FieldConfig } from "@/interfaces/IUform";
import { Input } from "@nextui-org/react";
import { Control, Controller } from "react-hook-form";

export const DateForm = ({ config, name, control }: { config: FieldConfig, name: string, control: Control<any> }) => { 
    return (
        <Controller
            name={name as any}
            control={control}
            rules={config.validation}
            render={({ field: { onChange, value, ...fieldRest } }) => (
                <Input
                    {...fieldRest} // Aquí agregamos todos los campos del controlador
                    type="date"
                    label={config.label}
                    value={value ? value.toISOString().split("T")[0] : ""}
                    onChange={(e) => {
                        const date = new Date(e.target.value);
                        onChange(date);
                    }}
                />
            )}
        />
    );
};
