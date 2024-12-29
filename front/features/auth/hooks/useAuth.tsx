import { useState } from "react";

import { useAsyncAction } from "../../../hooks/useAsyncAction";

import { IURegister } from "@/interfaces/IUauth";
import { saveToken } from "@/features/auth/utils/saveUserInfo";

export const useAuth = (setError: any, api: any) => {
  const [generalError, setGeneralError] = useState("");
  const { loading, error, execute } = useAsyncAction(api);

  const handleRegister = (data: IURegister, onSuccess: (res: any) => void) => {
    execute(data, (response) => {
      if (response?.errors?.invalid_credentials) {
        setGeneralError(response?.errors?.invalid_credentials);
      } else if (response?.errors) {
        // Aquí se aseguran los errores se pasen correctamente a setError
        Object.keys(response.errors).forEach((field) => {
          setError(field, {
            type: "server",
            message: response.errors[field].join(", "), // Mensaje de error
          });
        });
        setGeneralError("Error en el formulario");
      } else {
        saveToken(response);
        onSuccess?.(response);
      }
    });
  };

  return { loading, error, generalError, handleRegister };
};
