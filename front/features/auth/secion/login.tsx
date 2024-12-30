"use client";

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
import { useState, useEffect } from "react";
import { FaEyeSlash, FaEye, FaLock } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

import { IURegister } from "@/interfaces/IUauth";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { validationRules } from "@/features/auth/utils/validations";
import { login as loginService } from "@/features/auth/services/auth";
import { TitleSection } from "@/components/utils/titleSection";
import { RestauerasePasswordModal } from "../components/modalResectPassword";

export const Login = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    trigger,
  } = useForm<IURegister>({
    mode: "onChange", // Validación en tiempo real
  });

  const { loading, handleRegister, generalError } = useAuth(
    setError,
    loginService
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSubmit = async (data: IURegister) => {
    try {
      await handleRegister(data, (response: any) => {
        if (response.errors) {
          Object.keys(response.errors).forEach((field) => {
            setError(field as keyof IURegister, {
              type: "server",
              message: response.errors[field].join(", "),
            });
          });
        } else {
          window.location.href = "/";
        }
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  if (!isClient) {
    return null;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-col gap-1 items-center">
        <TitleSection description="Sesión" title="Iniciar " />
        <p className="text-sm text-default-500">
          Por favor, inicie sesión para continuar.
        </p>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {generalError && (
            <div className="text-danger text-sm">{generalError}</div>
          )}

          <Input
            label="Username"
            startContent={
              <IoIosMail className="text-default-400 pointer-events-none flex-shrink-0" />
            }
            variant="bordered"
            {...register("username", validationRules.username)}
            errorMessage={errors.username?.message}
            isInvalid={!!errors.username}
          />

          <Input
            endContent={
              <button
                className="bg-transparent border-none"
                type="button"
                onClick={toggleVisibility}
              >
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
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
          />

          <div className="flex justify-between items-center">
            Recuerdame{" "}
            <input className="mr-2" id="remember-me" type="checkbox" />
            <RestauerasePasswordModal />
          </div>

          <Button
            className="mt-2"
            color="danger"
            disabled={!isValid || loading}
            isLoading={loading}
            type="submit"
            variant="shadow"
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </form>
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
