"use client";
import { useState } from "react";

import DynamicForm from "@/components/utils/form/dynamicForm";
import { TitleSection } from "@/components/utils/titleSection";
import { IUService } from "@/interfaces/IUservices";
import { ServiceFormConfig } from "@/features/services/utils/serviceFormConfig";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import {
  createService,
  uploadPhoto,
} from "@/features/services/services/services";
import { FormConfig } from "@/interfaces/IUform";

const updateEventPhotos = () => {};

export function CreateForm() {
  const [formConfig, setFormConfig] = useState<null | FormConfig>(null);
  const { error, execute, loading } = useAsyncAction(createService);
  const {
    error: uploadError,
    execute: uploadExecute,
    loading: uploadLoading,
  } = useAsyncAction(uploadPhoto);

  ServiceFormConfig({ setFormConfig });

  const handleSubmit = (data: IUService, photos: File[]) => {
    execute(data, (response) => {
      uploadExecute({ data: photos, idService: response.id }, (response) => {
        console.log("response image:", response);
      });
    });
  };

  if (!formConfig) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <TitleSection description="Evento" title="Crear" />
      <DynamicForm<IUService> formConfig={formConfig} onSubmit={handleSubmit} />
    </div>
  );
}
