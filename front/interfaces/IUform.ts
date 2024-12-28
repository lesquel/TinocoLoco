export interface SelectOption {
  label: string;
  value: string | number;
}

export type FieldType =
  | "text"
  | "textarea"
  | "select"
  | "file"
  | "number"
  | "checkbox"
  | "date"
  | "time";

export interface FieldConfig {
  type: FieldType;
  label: string;
  placeholder?: string;
  options?: SelectOption[];
  required?: boolean;
  validation?: {
    required?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: {
      value: string; // Cambiado de `RegExp` a `string`
      message: string;
    };
  };
}

export interface FormConfig {
  [key: string]: FieldConfig;
}
