"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/utils/form/dynamicForm";
import { createRentalConfig } from "@/features/rentals/utils/addRentalCondig";
import { FormConfig } from "@/interfaces/IUform";
import { useApiRequest } from "@/hooks/useApiRequest";
import { getPromotions } from "@/features/Promotions/services/promotions";
import { IURental, IUServiceToRentalAdd } from "@/interfaces/IURental";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import {
  createRental,
  addServiceToRental as addServiceToRentalService,
} from "../services/rentals";
import { TitleSection } from "@/components/utils/titleSection";
import { useErrorsForm } from "@/services/utils/useErrosForm";
import { siteConfig } from "@/config/site";
import { AddServices } from "./addServices";
import { Button, Card, CardBody } from "@nextui-org/react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa6";

interface AddRentalFormProps {
  idEvent: number;
}

export function AddRentalForm({ idEvent }: AddRentalFormProps) {
  const router = useRouter();
  const [formConfig, setFormConfig] = useState<FormConfig | null>(null);
  const [externalErrors, setExternalErrors] = useState<Record<string, string>>(
    {},
  );
  const {
    data: promotionsData,
    error,
    isLoading,
  } = useApiRequest(getPromotions);
  const { execute, loading } = useAsyncAction(createRental);
  const {
    execute: addServiceToRentalExecute,
    loading: addServiceToRentalLoading,
  } = useAsyncAction(addServiceToRentalService);
  const [addedServices, setAddedServices] = useState<IUServiceToRentalAdd[]>(
    [],
  );
  const [showAddServices, setShowAddServices] = useState(false);

  useEffect(() => {
    if (!isLoading && !error && promotionsData) {
      const config = createRentalConfig(promotionsData.results || []);
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

      if (addedServices.length === 0) {
        
        router.push(`${siteConfig.navMenuItems.rentals.href}/${response.id}`);
        return;
      }
      addServiceToRentalExecute(
        { data: addedServices, rentalId: response.id },
        (response) => {
          router.push(`${siteConfig.navMenuItems.rentals.href}/${response.id}`);
        },
      );
    });
  };

  const handleAddService = (service: IUServiceToRentalAdd) => {
    setAddedServices((prev) => [...prev, service]);
  };

  const handleRemoveService = (index: number) => {
    setAddedServices((prev) => prev.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">Cargando...</div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">Error al cargar promociones: {error}</div>
    );
  }

  if (!formConfig) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-6">
      <TitleSection title="Agregar Alquiler" description="Evento" />
      <Card className="w-full max-w-2xl">
        <CardBody>
          <DynamicForm
            formConfig={formConfig}
            onSubmit={onSubmit}
            externalErrors={externalErrors}
          />
          {addedServices.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">
                Servicios agregados:
              </h3>
              <ul className="space-y-2">
                {addedServices.map((service, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-100 p-2 rounded"
                  >
                    <span>
                      Servicio con el id {service.service_id} - Cantidad:{" "}
                      {service.service_quantity}
                    </span>
                    <Button
                      isIconOnly
                      color="danger"
                      variant="light"
                      onPress={() => handleRemoveService(index)}
                    >
                      <FaTrash className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardBody>
      </Card>
      <Card className="w-full max-w-2xl">
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Servicios</h2>
            <Button
              onClick={() => setShowAddServices(!showAddServices)}
              variant={showAddServices ? "light" : "solid"}
              color={showAddServices ? "danger" : "primary"}
              startContent={showAddServices ? <FaMinus /> : <FaPlus />}
            >
              {showAddServices ? "Ocultar" : "Agregar Servicio"}
            </Button>
          </div>
          {showAddServices && <AddServices onAddService={handleAddService} />}
        </CardBody>
      </Card>
    </div>
  );
}
