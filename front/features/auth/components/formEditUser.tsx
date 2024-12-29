"use client";
import { useCallback, useState } from "react";

import { editUserConfigForm } from "../utils/editUserConfigForm";
import { getTokenFromCookie } from "../utils/getUserInfo";
import { editUser, getUser } from "../services/auth";

import DynamicForm from "@/components/utils/form/dynamicForm";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import { useApiRequest } from "@/hooks/useApiRequest";
import { useErrorsForm } from "@/services/utils/useErrosForm";
import { FormLoading } from "@/components/utils/loagins/formLoading";

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

  if (isLoading) {
    return <FormLoading inputCount={6} />;
  }

  if (!data) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center  relative">
      <DynamicForm
        externalErrors={externalErrors}
        formConfig={editUserConfigForm}
        initialData={data}
        onSubmit={onSubmit}
      />
    </div>
  );
}
