"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import { FaPlus, FaMinus } from "react-icons/fa6";

import {
  createRental,
  addServiceToRental as addServiceToRentalService,
} from "../services/rentals";
import { SimpleService } from "@/features/rentals/components/simpleService";
import { AddServices } from "@/features/rentals/sections/addServices";
import DynamicForm from "@/components/utils/form/dynamicForm";
import { createRentalConfig } from "@/features/rentals/utils/addRentalCondig";
import { FormConfig } from "@/interfaces/IUform";
import { useApiRequest } from "@/hooks/useApiRequest";
import { getPromotions } from "@/features/promotions/services/promotions";
import { IURental, IUServiceToRentalAdd } from "@/interfaces/IURental";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import { TitleSection } from "@/components/utils/titleSection";
import { useErrorsForm } from "@/services/utils/useErrosForm";
import { FormLoading } from "@/components/utils/loagins/formLoading";

interface AddRentalFormProps {
  idEvent: number;
}

export function AddRentalForm({ idEvent }: AddRentalFormProps) {
  const [externalErrors, setExternalErrors] = useState<Record<string, string>>(
    {}
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
    []
  );
  const [showAddServices, setShowAddServices] = useState(false);

  const formConfig = useMemo(() => {
    if (!promotionsData?.results) return null;
    return createRentalConfig(promotionsData.results);
  }, [promotionsData]);

  const onSubmit = useCallback(
    async (data: IURental) => {
      const formData = { ...data, event: idEvent };

      execute(formData, (response) => {
        if (response.errors) {
          useErrorsForm({ response, setExternalErrors });
          return;
        }
        console.log("response rental", response);
        const rentaId = response.id;
        if (addedServices.length === 0) {
          window.location.href = `/rentals/${rentaId}`;
          return;
        }
        console.log("addedServicesssssssssssssssssssssssssssssssssssssssss", addedServices);
        addServiceToRentalExecute(
          { data: addedServices, rentalId: rentaId },
          (response) => {
            console.log("response addServiceToRentalExecute", response);
            window.location.href = `/rentals/${rentaId}`;
          }
        );
      });
    },
    [execute, addServiceToRentalExecute, addedServices, idEvent]
  );

  const handleAddService = useCallback((service: IUServiceToRentalAdd) => {
    setAddedServices((prev) => [...prev, service]);
  }, []);

  const handleRemoveService = useCallback((index: number) => {
    setAddedServices((prev) => prev.filter((_, i) => i !== index));
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1">
        <TitleSection description="Evento" title="Agregar Alquiler" />
        <Card>
          <FormLoading inputCount={8} />
        </Card>
      </div>
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
    <div className="flex-1 flex flex-col items-center justify-center space-y-6">
      <TitleSection description="Evento" title="Agregar Alquiler" />
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <Card className="w-full flex flex-col items-center justify-center">
          <CardBody className="flex flex-col items-center justify-center">
            <DynamicForm
              externalErrors={externalErrors}
              formConfig={formConfig}
              onSubmit={onSubmit}
            />
            {addedServices.length > 0 && (
              <div className="mt-4 w-full">
                <h3 className="text-xl font-semibold mb-2">
                  Servicios agregados:
                </h3>
                <ul className="space-y-2">
                  {addedServices.map((service, index) => (
                    <SimpleService
                      key={index}
                      idService={service.service_id}
                      serviceQuantity={service.service_quantity}
                      onRemove={() => handleRemoveService(index)}
                    />
                  ))}
                </ul>
              </div>
            )}
          </CardBody>
        </Card>
        <Card className="w-full">
          <CardBody>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Servicios</h2>
              <Button
                color={showAddServices ? "danger" : "primary"}
                startContent={showAddServices ? <FaMinus /> : <FaPlus />}
                variant={showAddServices ? "light" : "solid"}
                onClick={() => setShowAddServices(!showAddServices)}
              >
                {showAddServices ? "Ocultar" : "Agregar Servicio"}
              </Button>
            </div>
            {showAddServices && <AddServices onAddService={handleAddService} />}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
