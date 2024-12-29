import { useEffect } from "react";

import { getServiceCategorys } from "../services/services";

import { useApiRequest } from "@/hooks/useApiRequest";
import { FormConfig } from "@/interfaces/IUform";

export const ServiceFormConfig = ({
  setFormConfig,
}: {
  setFormConfig: any;
}) => {
  const { data, error, isLoading } = useApiRequest(getServiceCategorys);

  useEffect(() => {
    if (!isLoading && !error && data) {
      const makeOptions = (data: any) => {
        return data.results.map((item: any) => ({
          label: item.service_category_name,
          value: item.id,
        }));
      };

      const options = makeOptions(data);

      const config: FormConfig = {
        service_name: {
          type: "text",
          label: "Nombre del Servicio",
          required: true,
          validation: {
            required: "El nombre del servicio es obligatorio",
            maxLength: 100,
          },
        },
        service_description: {
          type: "textarea",
          label: "Descripción del Servicio",
          required: true,
          validation: {
            required: "La descripción del servicio es obligatoria",
            maxLength: 500,
          },
        },
        service_unitary_cost: {
          type: "text",
          label: "Costo Unitario",
          required: true,
          validation: {
            required: "El costo unitario es obligatorio",
            pattern: {
              value: "^[0-9]+(\\.[0-9]{1,2})?$",
              message: "El costo unitario debe ser un número válido",
            },
          },
        },
        service_category: {
          type: "select",
          label: "Categoría del Servicio",
          options: options,
          required: true,
          validation: {
            required: "La categoría del servicio es obligatoria",
          },
        },
        photos: {
          type: "file",
          label: "Fotos",
          required: true,
          validation: {
            required: "Las fotos son obligatorias",
          },
        },
        is_active: {
          type: "checkbox",
          label: "Servicio Activo",
          required: false,
        },
      };

      setFormConfig(config);
    }
  }, [isLoading, error, data]);
};
