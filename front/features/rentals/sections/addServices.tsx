"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useApiRequest } from "@/hooks/useApiRequest";
import { IUServiceToRentalAdd } from "@/interfaces/IURental";
import DynamicForm from "@/components/utils/form/dynamicForm";
import { FormConfig } from "@/interfaces/IUform";
import { IUService } from "@/interfaces/IUservices";
import { getServices } from "@/features/services/services/services";
import { FormLoading } from "@/components/utils/loagins/formLoading";

interface AddServicesProps {
  onAddService: (service: IUServiceToRentalAdd) => void;
}

export function AddServices({ onAddService }: AddServicesProps) {
  const { data: servicesData, error, isLoading } = useApiRequest(getServices);

  const serviceFormConfig = useMemo(() => {
    if (!servicesData?.results) return null;

    return {
      service_id: {
        type: "select",
        label: "Servicio",
        options: servicesData.results.map((service: IUService) => ({
          value: service.id,
          label: service.service_name,
        })),
        required: true,
        validation: {
          required: "El servicio es obligatorio",
        },
      },
      service_quantity: {
        type: "number",
        label: "Cantidad",
        required: true,
        validation: {
          required: "La cantidad es obligatoria",
          min: 1,
        },
      },
    } as FormConfig;
  }, [servicesData]);

  const onSubmitService = useCallback((data: IUServiceToRentalAdd) => {
    if (data) {
      onAddService(data);
    }
  }, [onAddService]);

  if (isLoading) {
    return <FormLoading inputCount={2} />;
  }

  if (error) {
    return <div className="text-red-500">Error al cargar servicios: {error}</div>;
  }

  if (!serviceFormConfig) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <DynamicForm formConfig={serviceFormConfig} onSubmit={onSubmitService} />
    </div>
  );
}
