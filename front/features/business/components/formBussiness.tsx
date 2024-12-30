"use client";
import { getBusiness, updateBusiness } from "../services/businessServices";

import DynamicForm from "@/components/utils/form/dynamicForm";
import { businessFormConfig } from "@/features/business/utils/businessFormConfig";
import { useApiRequest } from "@/hooks/useApiRequest";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import { useErrorsForm } from "@/services/utils/useErrosForm";
import { redirect } from "next/navigation";
import { useState } from "react";
export const FormBusiness = () => {
  const { error: errorGetBusiness, execute: executeGetBusiness } =
    useAsyncAction(updateBusiness);
  const { data, error } = useApiRequest(getBusiness);

  if (error) {
    return <div>Error al obtener la información de la empresa</div>;
  }

  if (!data) {
    return <div>Cargando...</div>;
  }
  const handleSubmit = (data: any, photos: File[]) => {
    data = { ...data, business_logo: photos[0] };
    const [externalErrorss, setExternalErrors] = useState<Record<string, string>>();
    executeGetBusiness(data, (response: any) => {
      if (response.errors) {
        useErrorsForm({ response, setExternalErrors });
        return;
      }
      redirect("/dashboard/business");
    });
  };

  return (
    <div>
      <DynamicForm
        formConfig={businessFormConfig}
        initialData={data}
        onSubmit={handleSubmit}
        externalErrors={externalErrorss}
      />
    </div>
  );
};
