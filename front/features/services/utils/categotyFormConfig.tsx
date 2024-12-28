import { FormConfig } from "@/interfaces/IUform";

export const categoryFormConfig: FormConfig = {
  event_category_name: {
    type: "text",
    label: "Nombre de la Categoría",
    required: true,
    validation: {
      required: "El nombre de la categoría es obligatorio",
      maxLength: 100,
    },
  },
  event_category_description: {
    type: "textarea",
    label: "Descripción de la Categoría",
    required: true,
    validation: {
      required: "La descripción de la categoría es obligatoria",
      maxLength: 500,
    },
  },
  event_category_image: {
    type: "file",
    label: "Imagen de la Categoría",
    required: true,
    validation: {
      required: "La imagen de la categoría es obligatoria",
    },
  },
  is_active: {
    type: "checkbox",
    label: "Categoría Activa",
    required: false,
  },
};
