"use client";
import DynamicForm from "@/components/utils/form/dynamicForm";
import { useForm } from "react-hook-form";
import { editUserConfigForm } from "../utils/editUserConfigForm";
import { getTokenFromCookie } from "../utils/getUserInfo";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import { useCallback } from "react";
import { editUser, getUser } from "../services/auth";
import { useApiRequest } from "@/hooks/useApiRequest";

export default function FormEditUser() {
  const userInfo = getTokenFromCookie();
  const fetchUser = useCallback(() => getUser(userInfo?.user?.id), []);
  const { data, error, isLoading } = useApiRequest(fetchUser);
  const { error: updateError, execute: updateExecute, loading: updateLoading } = useAsyncAction(editUser);

  const onSubmit = (formData: any) => {
    updateExecute({ ...formData, id: userInfo?.user?.id }, (response) => {
      console.log("User updated successfully", response);
    });
  };

  if (error) {
    return <div>Error al obtener la información del usuario</div>;
  }
  if (!data) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <DynamicForm
        formConfig={editUserConfigForm}
        onSubmit={onSubmit}
        initialData={data}
      />
      {updateLoading && <div>Actualizando...</div>}
      {updateError && <div>Error al actualizar el usuario: {updateError.message}</div>}
    </div>
  );
}