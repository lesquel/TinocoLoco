import { FormConfig } from "@/interfaces/IUform";

export const createRentalConfig = (promotions: any[]): FormConfig => {
  const promotionOptions = promotions.map((item: any) => ({
    label: item.promotion_name,
    value: item.id,
  }));

  return {
    event_rental_date: {
      type: "date",
      label: "Fecha de alquiler",
      required: true,
      validation: {
        required: "La fecha de alquiler es obligatoria",
      },
    },
    event_rental_start_time: {
      type: "time",
      label: "Hora de inicio",
      required: true,
      validation: {
        required: "La hora de inicio es obligatoria",
      },
    },
    event_rental_planified_end_time: {
      type: "time",
      label: "Hora de finalización",
      required: true,
      validation: {
        required: "La hora de finalización es obligatoria",
      },
    },
    event_rental_cancelled_value_in_advance: {
      type: "number",
      label: "Valor cancelado por adelantado",
      required: true,
      validation: {
        required: "El valor cancelado por adelantado es obligatorio",
        min: 0,
      },
    },
    event_rental_payment_method: {
      type: "select",
      label: "Método de pago",
      options: [
        { label: "Efectivo", value: "cash" },
        { label: "Tarjeta de crédito", value: "credit_card" },
        { label: "Tarjeta de débito", value: "debit_card" },
        { label: "Transferencia bancaria", value: "bank_transfer" },
        { label: "Otro", value: "other" },
      ],
      required: true,
    },
    event_rental_min_attendees: {
      type: "number",
      label: "Mínimo de asistentes al alquiler",
      required: true,
      validation: {
        required: "El mínimo de asistentes al alquiler es obligatorio",
        min: 0,
      },
    },
    event_rental_max_attendees: {
      type: "number",
      label: "Máximo de asistentes al alquiler",
      required: true,
      validation: {
        required: "El máximo de asistentes al alquiler es obligatorio",
        min: 0,
      },
    },
    promotion: {
      type: "select",
      label: "Promoción",
      options: promotionOptions,
      required: false,
    },
  };
};
