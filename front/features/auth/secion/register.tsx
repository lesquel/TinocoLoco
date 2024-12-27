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
import { IURegister } from "@/interfaces/IUauth";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { validationRules } from "@/features/auth/utils/validations";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { register as registerService } from "@/features/auth/services/auth";
import { FaEyeSlash, FaEye, FaLock, FaUser } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { TitleSection } from "@/components/utils/titleSection";

export const Register = () => {
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IURegister>();
  const { handleRegister, generalError, loading } = useAuth(
    setError,
    registerService
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSubmit = async (data: IURegister) => {
    try {
      await handleRegister(data, (response: any) => {
        if (response.errors) {
          // Handle server-side errors
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
      console.error("Registration error:", error);
    } finally {
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  if (!isClient) {
    return null;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-col gap-1 items-center">
        <TitleSection title="Crear " description=" Cuenta" />
        <p className="text-sm text-default-500">
          Por favor, complete el formulario para registrarse.
        </p>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {generalError && (
            <div className="text-danger text-sm">{generalError}</div>
          )}

          <Input
            label="Email"
            variant="bordered"
            startContent={
              <IoIosMail className="text-default-400 pointer-events-none flex-shrink-0" />
            }
            {...register("email", validationRules.email)}
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
          />

          <Input
            label="Username"
            variant="bordered"
            startContent={
              <FaUser className="text-default-400 pointer-events-none flex-shrink-0" />
            }
            {...register("username", validationRules.username)}
            errorMessage={errors.username?.message}
            isInvalid={!!errors.username}
          />

          <Input
            label="Password"
            variant="bordered"
            startContent={
              <FaLock className="text-default-400 pointer-events-none flex-shrink-0" />
            }
            endContent={
              <button
                type="button"
                onClick={toggleVisibility}
                className="bg-transparent border-none"
              >
                {isVisible ? (
                  <FaEyeSlash className="text-default-400 pointer-events-none" />
                ) : (
                  <FaEye className="text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            {...register("password", validationRules.password)}
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
          />

          <Button
            type="submit"
            color="primary"
            variant="shadow"
            isLoading={loading}
            disabled={loading}
            className="mt-2"
          >
            {loading ? "Registrando..." : "Registrar"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-default-500">¿Ya tienes una cuenta? </span>
          <Link href="/accounts/login" size="sm">
            Iniciar sesión
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};
