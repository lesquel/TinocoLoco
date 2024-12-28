import { FormConfig } from "@/interfaces/IUform";

export const businessFormConfig: FormConfig = {
  business_name: {
    type: "text",
    label: "Nombre de la Empresa",
    required: false,
    validation: {
      required: "El nombre de la empresa es obligatorio",
      maxLength: 100,
    },
  },
  business_logo: {
    type: "file",
    label: "Logo de la Empresa",
    required: false,
  },
  business_address: {
    type: "text",
    label: "Dirección de la Empresa",
    required: false,
    validation: {
      maxLength: 255,
    },
  },
  business_phone_number: {
    type: "text",
    label: "Número de teléfono de la Empresa",
    required: false,
    validation: {
      maxLength: 15,
    },
  },
  business_email: {
    type: "text",
    label: "Correo electrónico de la Empresa",
    required: false,
    validation: {
      maxLength: 15,
    },
  },
  business_website: {
    type: "text",
    label: "Sitio web de la Empresa",
    required: false,
    validation: {
      maxLength: 255,
    },
  },
  business_facebook: {
    type: "text",
    label: "URL de Facebook de la Empresa",
    required: false,
    validation: {
      maxLength: 255,
    },
  },
  business_instagram: {
    type: "text",
    label: "URL de Instagram de la Empresa",
    required: false,
    validation: {
      maxLength: 255,
    },
  },
  business_x: {
    type: "text",
    label: "URL de X (anteriormente Twitter) de la Empresa",
    required: false,
    validation: {
      maxLength: 255,
    },
  },
  business_bank_account_number_1: {
    type: "text",
    label: "Número de cuenta bancaria 1 de la Empresa",
    required: false,
    validation: {
      maxLength: 15,
    },
  },
  business_bank_name_1: {
    type: "text",
    label: "Nombre de la cuenta bancaria 1 de la Empresa",
    required: false,
    validation: {
      maxLength: 40,
    },
  },
  business_bank_account_type_1: {
    type: "text",
    label: "Tipo de cuenta bancaria 1 de la Empresa",
    required: false,
    validation: {
      maxLength: 15,
    },
  },
  business_bank_account_number_2: {
    type: "text",
    label: "Número de cuenta bancaria 2 de la Empresa",
    required: false,
    validation: {
      maxLength: 15,
    },
  },
  business_bank_name_2: {
    type: "text",
    label: "Nombre de la cuenta bancaria 2 de la Empresa",
    required: false,
    validation: {
      maxLength: 40,
    },
  },
  business_bank_account_type_2: {
    type: "text",
    label: "Tipo de cuenta bancaria 2 de la Empresa",
    required: false,
    validation: {
      maxLength: 15,
    },
  },
};
