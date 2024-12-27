"use client";

import { useEffect, useState } from "react";
import DynamicForm from "@/components/utils/form/dynamicForm";
import { createRentalConfig } from "@/features/rentals/utils/addRentalCondig";
import { FormConfig } from "@/interfaces/IUform";
import { useApiRequest } from "@/hooks/useApiRequest";
import { getPromotions } from "@/features/Promotions/services/promotions";
import { IURental } from "@/interfaces/IURental";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import { createRental } from "../services/rentals";

interface AddRentalFormProps {
  idEvent: number;
}

export function AddRentalForm({ idEvent }: AddRentalFormProps) {
  const [formConfig, setFormConfig] = useState<FormConfig | null>(null);
  const {
    data: promotionsData,
    error,
    isLoading,
  } = useApiRequest(getPromotions);

  const {
    execute,
    loading,
    error: addRentalError,
  } = useAsyncAction(createRental);

  useEffect(() => {
    if (!isLoading && !error && promotionsData) {
      const config = createRentalConfig(promotionsData.results);
      console.log("Config:", config);
      setFormConfig(config);
    }
  }, [isLoading, error, promotionsData]);

  const onSubmit = async (data: IURental) => {
    const formData = {
      ...data,
      event: idEvent,
    };

    
    execute(formData, (response) => {
        console.log("Datos del formulario:", response);
    });
};

if (isLoading) {
    return (
        <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
}
console.log("promotionsDataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", promotionsData);

  if (error) {
    return (
      <div className="text-red-500">
        Error al cargar las promociones: {error.message}
      </div>
    );
  }

  if (!formConfig) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">Agregar Alquiler</h1>
      <div className="w-full max-w-md">
        <DynamicForm formConfig={formConfig} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
