"use client";
import { categoryFormConfig } from "../../utils/categotyFormConfig";
import { createCategory } from "../../services/services";

import DynamicForm from "@/components/utils/form/dynamicForm";
import { TitleSection } from "@/components/utils/titleSection";
import { IUCategory } from "@/interfaces/IUservices";
import { useAsyncAction } from "@/hooks/useAsyncAction";

export function CreateFormCategory() {
  const { error, execute, loading } = useAsyncAction(createCategory);
  const handleSubmit = (data: IUCategory, photos: File[]) => {
    execute(data, (response) => {
      console.log("response:", response);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <TitleSection description="de Evento" title="Crear Categoría" />
      <DynamicForm<IUCategory>
        formConfig={categoryFormConfig}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
