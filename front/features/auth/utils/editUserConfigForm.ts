import { FormConfig } from "@/interfaces/IUform";

export const editUserConfigForm: FormConfig = {
  identity_card: {
    type: "text",
    label: "Número de cédula",
    required: true,
    validation: {
      maxLength: 100,
    },
  },
  username: {
    type: "text",
    label: "Nombre de usuario",
    required: true,
    validation: {
      maxLength: 100,
    },
  },
  first_name: {
    type: "text",
    label: "Nombre",
    required: true,
    validation: {
      maxLength: 100,
    },
  },

  last_name: {
    type: "text",
    label: "Apellido",
    required: true,
    validation: {
      maxLength: 100,
    },
  },

  sex: {
    type: "select",
    label: "Sexo",
    options: [
      { label: "Masculino", value: "M" },
      { label: "Femenino", value: "F" },
    ],
    required: true,
  },

  nationality: {
    type: "text",
    label: "Nacionalidad",
    required: true,
    validation: {
      maxLength: 100,
    },
  },
};
