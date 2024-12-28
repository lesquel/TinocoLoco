"use client";

import { useState, useEffect } from "react";
import { useApiRequest } from "@/hooks/useApiRequest";
import { IUServiceToRentalAdd } from "@/interfaces/IURental";
import DynamicForm from "@/components/utils/form/dynamicForm";
import { FormConfig } from "@/interfaces/IUform";
import { IUService } from "@/interfaces/IUservices";
import { getServices } from "@/features/services/services/services";
import { Button } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";

interface AddServicesProps {
  onAddService: (service: IUServiceToRentalAdd) => void;
}

export function AddServices({ onAddService }: AddServicesProps) {
  const [serviceFormConfig, setServiceFormConfig] = useState<FormConfig | null>(null);
  const { data: servicesData, error, isLoading } = useApiRequest(getServices);

  useEffect(() => {
    if (!isLoading && !error && servicesData) {
      const config: FormConfig = {
        service_id: {
          type: "select",
          label: "Servicio",
          options: (servicesData.results || []).map((service: IUService) => ({
            value: service.id,
            label: service.service_name,
          })),
          required: true,
          validation: {
            required: "El servicio es obligatorio",
          }
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
      };
      setServiceFormConfig(config);
    }
  }, [isLoading, error, servicesData]);

  const onSubmitService = (data: IUServiceToRentalAdd) => {
    if (data) {
      const newService = {
        ...data,
      };
      console.log("newService", newService);
      onAddService(newService);
    }
  };

  if (isLoading) {
    return <div>Cargando servicios...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error al cargar servicios: {error.message}</div>;
  }

  if (!serviceFormConfig) {
    return null;
  }

  return (
    <div className="w-full">
      <DynamicForm
        formConfig={serviceFormConfig}
        onSubmit={onSubmitService}
        // submitButton={
        //   <Button type="submit" color="primary" startContent={<FaPlus />}>
        //     Agregar Servicio
        //   </Button>
        // }
      />
    </div>
  );
}

