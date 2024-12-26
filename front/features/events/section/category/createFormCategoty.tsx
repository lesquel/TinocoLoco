"use client";
import DynamicForm from "@/components/utils/form/dynamicForm";
import { TitleSection } from "@/components/utils/titleSection";
import { IUCategory } from "@/interfaces/IUevents";
import { categoryFormConfig } from "../../utils/categoryFormConfig";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import { createCategory } from "../../services/events";

export function CreateFormCategory() {
  const { error, execute, loading } = useAsyncAction(createCategory);
  const handleSubmit = (data: IUCategory, photos: File[]) => {
    execute(data, (response) => {
      console.log("response:", response);
    });
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <TitleSection title="Crear Categoría" description="de Evento" />
      <DynamicForm<IUCategory>
        formConfig={categoryFormConfig}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
