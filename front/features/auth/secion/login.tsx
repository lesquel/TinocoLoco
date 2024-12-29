import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Link,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FaEyeSlash, FaEye, FaLock } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

import { IURegister } from "@/interfaces/IUauth";
import { validationRules } from "@/features/auth/utils/validations";
import { TitleSection } from "@/components/utils/titleSection";

export const Login = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IURegister>({
    mode: "onChange", // Detecta errores reactivamente
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data: IURegister) => {
    console.log("Form Data: ", data);
    // Lógica para manejar el envío del formulario
  };

  if (!isClient) {
    return null;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-col gap-1 items-center">
        <TitleSection description=" Sesión" title="Iniciar " />
        <p className="text-sm text-default-500">Por favor, iniciar sesión para continuar</p>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Mensaje de error general */}
          {errors && errors.general && (
            <div className="text-danger text-sm">{errors.general.message}</div>
          )}

          {/* Input para el usuario */}
          <div className="flex flex-col">
            <Input
              label="Username"
              startContent={
                <IoIosMail className="text-default-400 pointer-events-none flex-shrink-0" />
              }
              variant="bordered"
              {...register("username", validationRules.username)}
              isInvalid={!!errors.username}
            />
            {errors.username && (
              <span className="text-danger text-sm">
                {errors.username.message}
              </span>
            )}
          </div>

          {/* Input para la contraseña */}
          <div className="flex flex-col">
            <Input
              endContent={
                <button type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <FaEyeSlash className="text-default-400 pointer-events-none" />
                  ) : (
                    <FaEye className="text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              label="Password"
              startContent={
                <FaLock className="text-default-400 pointer-events-none flex-shrink-0" />
              }
              type={isVisible ? "text" : "password"}
              variant="bordered"
              {...register("password", validationRules.password)}
              isInvalid={!!errors.password}
            />
            {errors.password && (
              <span className="text-danger text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Recordarme y enlace */}
          <div className="flex justify-between items-center">
            <label htmlFor="remember-me" className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="mr-2"
                {...register("rememberMe")}
              />
              Recuérdame
            </label>
            <Link href="#" size="sm" className="text-[#F43F5E] hover:underline">
              ¿Olvidó su contraseña?
            </Link>
          </div>

          {/* Botón para enviar */}
          <Button
            className="mt-2"
            color="danger"
            type="submit"
            variant="shadow"
          >
            Iniciar Sesión
          </Button>
        </form>

        {/* Enlace para registrar */}
        <div className="text-center mt-4">
          <span className="text-default-500">¿No tienes una cuenta? </span>
          <Link href="/accounts/register" size="sm" className="text-[#F43F5E]">
            Crear cuenta
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};
