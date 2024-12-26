"use client";
import DynamicForm from "@/components/utils/form/dynamicForm";
import { businessFormConfig } from "@/features/business/utils/businessFormConfig";
import { useApiRequest } from "@/hooks/useApiRequest";
import { getBusiness, updateBusiness } from "../services/businessServices";
import { useAsyncAction } from "@/hooks/useAsyncAction";
export const FormBusiness = () => {
    const { error : errorGetBusiness, execute: executeGetBusiness } = useAsyncAction(updateBusiness);
    const { data, error } = useApiRequest(getBusiness);

    if (error) {
        return <div>Error al obtener la información de la empresa</div>;
    }

    if (!data) {
        return <div>Cargando...</div>;
    }
    const handleSubmit = (data: any, photos: File[]) => {
      data = { ...data, business_logo: photos[0] };
      console.log("data:aaaaawfwefwefweweaaaa", data);
        executeGetBusiness(data, (response: any) => {
            console.log("response bussiness:", response);
        });
    };
  return (
    <div>
      <DynamicForm formConfig={businessFormConfig} onSubmit={handleSubmit} initialData={data} />
    </div>
  );
};