import { Button, Card, CardBody, CardHeader, Input, Link } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { FaEyeSlash, FaEye, FaLock, FaUser } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

import { IURegister } from "@/interfaces/IUauth";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { validationRules } from "@/features/auth/utils/validations";
import { register as registerService } from "@/features/auth/services/auth";
import { TitleSection } from "@/components/utils/titleSection";

export const Register = () => {
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }, // Get isValid from the formState
    setError,
    watch, // Watch function to get form values
    trigger, // Trigger validation manually
  } = useForm<IURegister>({
    mode: "onChange", // Automatically trigger validation on change
  });
  
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
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  if (!isClient) {
    return null;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-col gap-1 items-center">
        <TitleSection description=" Cuenta" title="Crear " />
        <p className="text-sm text-default-500">
          Por favor, complete el formulario para registrarse.
        </p>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {generalError && (
            <div className="text-danger text-sm">{generalError}</div>
          )}

          <Input
            label="Email"
            startContent={
              <IoIosMail className="text-default-400 pointer-events-none flex-shrink-0" />
            }
            variant="bordered"
            {...register("email", validationRules.email)}
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
          />

          <Input
            label="Username"
            startContent={
              <FaUser className="text-default-400 pointer-events-none flex-shrink-0" />
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
            label="Confirmar Password"
            startContent={
              <FaLock className="text-default-400 pointer-events-none flex-shrink-0" />
            }
            type={isVisible ? "text" : "password"}
            variant="bordered"
            {...register("confirmPassword", {
              validate: (value) =>
                value === watch("password") || "Las contraseñas no coinciden",
            })}
            errorMessage={errors.confirmPassword?.message}
            isInvalid={!!errors.confirmPassword}
          />

          <div className="flex justify-between items-center">
            Términos y condiciones{" "}
            <input className="mr-2" id="remember-me" type="checkbox" required />
          </div>

          <Button
            className="mt-2"
            color="danger"
            disabled={!isValid || loading} // Disable button if form is not valid or loading
            isLoading={loading}
            type="submit"
            variant="shadow"
          >
            {loading ? "Registrando..." : "Registrar"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-default-500">¿Ya tienes una cuenta? </span>
          <Link href="/accounts/login" size="sm" className="text-white hover:text-[#F43F5E]">
            Iniciar sesión
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};
