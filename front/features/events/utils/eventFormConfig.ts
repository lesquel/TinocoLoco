import { useEffect } from "react";

import { getCategorys } from "../services/events";

import { useApiRequest } from "@/hooks/useApiRequest";
import { FormConfig } from "@/interfaces/IUform";

export const EventFormConfig = ({ setFormConfig }: { setFormConfig: any }) => {
  const { data, error, isLoading } = useApiRequest(getCategorys);

  useEffect(() => {
    if (!isLoading && !error && data) {
      const makeOptions = (data: any) => {
        return data.results.map((item: any) => ({
          label: item.event_category_name,
          value: item.id,
        }));
      };

      const options = makeOptions(data);

      const config: FormConfig = {
        event_name: {
          type: "text",
          label: "Nombre del Evento",
          required: true,
          validation: {
            required: "El nombre del evento es obligatorio",
            maxLength: 100,
          },
        },
        event_description: {
          type: "textarea",
          label: "Descripción del Evento",
          required: true,
          validation: {
            required: "La descripción del evento es obligatoria",
            maxLength: 500,
          },
        },
        event_reference_value: {
          type: "text",
          label: "Valor Referencia",
          required: true,
          validation: {
            required: "El valor de referencia es obligatorio",
            pattern: {
              value: "^[0-9]+(\\.[0-9]{1,2})?$",
              message: "El valor de referencia debe ser un número válido",
            },
          },
        },
        event_allowed_hours: {
          type: "number",
          label: "Horas Permitidas",
          required: true,
          validation: {
            required: "Las horas permitidas son obligatorias",
            min: 1,
            max: 24,
          },
        },
        event_extra_hour_rate: {
          type: "text",
          label: "Tarifa Extra por Hora",
          required: true,
          validation: {
            required: "La tarifa extra por hora es obligatoria",
            pattern: {
              value: "^[0-9]+(\\.[0-9]{1,2})?$",
              message: "La tarifa extra por hora debe ser un número válido",
            },
          },
        },
        event_category: {
          type: "select",
          label: "Categoría del Evento",
          options: options,
          required: true,
          validation: {
            required: "La categoría del evento es obligatoria",
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
          label: "Evento Activo",
          required: false,
        },
      };

      setFormConfig(config);
    }
  }, [isLoading, error, data]);
};
