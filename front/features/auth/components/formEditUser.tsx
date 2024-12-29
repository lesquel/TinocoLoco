"use client";
import DynamicForm from "@/components/utils/form/dynamicForm";
import { editUserConfigForm } from "../utils/editUserConfigForm";
import { getTokenFromCookie } from "../utils/getUserInfo";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import { useCallback, useState } from "react";
import { editUser, getUser } from "../services/auth";
import { useApiRequest } from "@/hooks/useApiRequest";
import { saveToken } from "../utils/saveUserInfo";
import { useErrorsForm } from "@/services/utils/useErrosForm";

export default function FormEditUser() {
  const userInfo = getTokenFromCookie();
  const [externalErrors, setExternalErrors] = useState<Record<string, string>>(
    {},
  );
  const fetchUser = useCallback(() => getUser(userInfo?.user?.id), []);
  const { data, error, isLoading } = useApiRequest(fetchUser);
  const {
    error: updateError,
    execute: updateExecute,
    loading: updateLoading,
  } = useAsyncAction(editUser);

  const onSubmit = (formData: any) => {
    updateExecute({ ...formData, id: userInfo?.user?.id }, (response) => {
      if (response.errors) {
        useErrorsForm({ response, setExternalErrors });
        return;
      }
      window.location.href = "/accounts";
    });
  };

  if (error) {
    return <div>Error al obtener la información del usuario</div>;
  }
  if (!data) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center  relative">
      <DynamicForm
        formConfig={editUserConfigForm}
        onSubmit={onSubmit}
        initialData={data}
        externalErrors={externalErrors}
      />
    </div>
  );
}
