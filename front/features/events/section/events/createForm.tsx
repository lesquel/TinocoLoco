"use client";
import { useState } from "react";

import DynamicForm from "@/components/utils/form/dynamicForm";
import { TitleSection } from "@/components/utils/titleSection";
import { IUEvent } from "@/interfaces/IUevents";
import { EventFormConfig } from "@/features/events/utils/eventFormConfig";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import { createEvent, uploadPhoto } from "@/features/events/services/events";
import { FormConfig } from "@/interfaces/IUform";

const updateEventPhotos = () => {};

export function CreateForm() {
  const [formConfig, setFormConfig] = useState<null | FormConfig>(null);
  const { error, execute, loading } = useAsyncAction(createEvent);
  const {
    error: uploadError,
    execute: uploadExecute,
    loading: uploadLoading,
  } = useAsyncAction(uploadPhoto);

  EventFormConfig({ setFormConfig });

  const handleSubmit = (data: IUEvent, photos: File[]) => {
    execute(data, (response) => {
      uploadExecute({ data: photos, idEvent: response.id }, (response) => {
        console.log("response image:", response);
      });
    });
  };

  if (!formConfig) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <TitleSection description="Evento" title="Crear" />
      <DynamicForm<IUEvent> formConfig={formConfig} onSubmit={handleSubmit} />
    </div>
  );
}
