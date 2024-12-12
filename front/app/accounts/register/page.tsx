"use client"; 
import { Button, Form, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { IURegister } from "@/services/interfaces/IUauth";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { validationRules } from "@/features/auth/utils/validations";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { register as registerService } from "@/features/auth/services/auth";

export const Register = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  const { register, handleSubmit, formState: { errors }, setError } = useForm<IURegister>();
  const { loading, error, handleRegister } = useAuth(setError, registerService);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSubmit = async (data: IURegister) => {
    handleRegister(data, (response: any) => {
      router.push("/"); 
    });
  };

  const convertErrors = (errors: { [key: string]: any }) => {
    const validationErrors: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(errors)) {
      validationErrors[key] = value?.message || "Error desconocido";
    }
    return validationErrors;
  };

  if (!isClient) {
    return null;
  }

  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-4"
      validationErrors={convertErrors(errors)}
      onSubmit={handleSubmit(onSubmit)}
    >
      {error && <div className="text-red-500 text-sm mb-4">{error.invalid_credentials || error}</div>}

      <Input
        label="Email"
        aria-describedby="email-error"
        {...register("email", validationRules.email)}
      />

      <Input
        label="Usuario"
        aria-describedby="username-error"
        {...register("username", validationRules.username)}
      />

      <Input
        label="Contraseña"
        type="password"
        aria-describedby="password-error"
        {...register("password", validationRules.password)}
      />

      <Button
        type="submit"
        variant="flat"
        disabled={loading}
        className="mt-4"
      >
        {loading ? "Registrando..." : "Registrarse"}
      </Button>
    </Form>
  );
};

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center  relative">
      <Register />
    </div>
  );
}
