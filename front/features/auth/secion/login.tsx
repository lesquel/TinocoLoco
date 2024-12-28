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
import { login as loginService } from "@/features/auth/services/auth";
import { FaEyeSlash, FaEye, FaLock } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { TitleSection } from "@/components/utils/titleSection";
import { getTokenFromCookie } from "@/features/auth/utils/getUserInfo";
export const Login = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IURegister>();
  const { loading, error, handleRegister, generalError } = useAuth(
    setError,
    loginService,
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSubmit = async (data: IURegister) => {
    handleRegister(data, (response: any) => {
      console.log("token:", getTokenFromCookie());
      window.location.href = "/";
    });
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  if (!isClient) {
    return null;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-col gap-1 items-center">
        <TitleSection title="Iniciar " description=" Sesión" />
        <p className="text-sm text-default-500">Please sign in to continue</p>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {generalError && (
            <div className="text-danger text-sm">{generalError}</div>
          )}

          <Input
            label="Username"
            variant="bordered"
            startContent={
              <IoIosMail className="text-default-400 pointer-events-none flex-shrink-0" />
            }
            {...register("username", validationRules.username)}
            errorMessage={errors.username?.message}
          />

          <Input
            label="Password"
            variant="bordered"
            startContent={
              <FaLock className="text-default-400 pointer-events-none flex-shrink-0" />
            }
            endContent={
              <button type="button" onClick={toggleVisibility}>
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
          />

          <div className="flex justify-between items-center">
            Recuerdame{" "}
            <input type="checkbox" className="mr-2" id="remember-me" />
            <Link href="#" size="sm">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            color="primary"
            variant="shadow"
            isLoading={loading}
            className="mt-2"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="text-center mt-4">
          <span className="text-default-500">Don't have an account? </span>
          <Link href="/accounts/register" size="sm">
            Register
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};
