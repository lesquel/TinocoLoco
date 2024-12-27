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
import { TitleSection } from "@/components/utils/titleSection";
import { useErrorsForm } from "@/services/utils/useErrosForm";

interface AddRentalFormProps {
  idEvent: number;
}

export function AddRentalForm({ idEvent }: AddRentalFormProps) {
  const [formConfig, setFormConfig] = useState<FormConfig | null>(null);
  const [externalErrors, setExternalErrors] = useState<Record<string, string>>({});
  const { data: promotionsData, error, isLoading } = useApiRequest(getPromotions);

  const { execute, loading } = useAsyncAction(createRental);

  useEffect(() => {
    if (!isLoading && !error && promotionsData) {
      const config = createRentalConfig(promotionsData.results);
      setFormConfig(config);
    }
  }, [isLoading, error, promotionsData]);

  const onSubmit = async (data: IURental) => {
    const formData = { ...data, event: idEvent };

    execute(formData, (response) => {
      if (response.errors) {
        useErrorsForm({ response, setExternalErrors });
        return;
      }

    });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-4">Cargando...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error al cargar promociones</div>;
  }

  if (!formConfig) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <TitleSection title="Agregar Alquiler" description="Evento" />
      <DynamicForm
        formConfig={formConfig}
        onSubmit={onSubmit}
        externalErrors={externalErrors}
      />
    </div>
  );
}
