"use client";
import { Input } from "@/features/auth/components/input";
import { SectionAuth } from "@/features/auth/components/sectionAuth";
import { BtnAuth } from "@/features/auth/components/btnAuth";
import { useForm } from "react-hook-form";
import { IURegister } from "@/services/interfaces/IUauth";
import { register as registerService } from "@/features/auth/services/auth";
import { CiUser } from "react-icons/ci";
import { HiOutlineMail } from "react-icons/hi";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { saveToken } from "../utils/saveToken";
import { useRouter } from "next/navigation"; // Importa useRouter para redireccionar

export const Register = () => {
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error
  const { register, handleSubmit, formState: { errors }} = useForm<IURegister>();
  const router = useRouter(); // Inicializa el hook de enrutamiento

  const onSubmit = async (data: IURegister) => {
    setLoading(true);
    setError(null); // Resetear errores antes de intentar registrar

    try {
      const response = await registerService(data);

      if (response.errors) {
        setError("Hubo un error al registrar al usuario. Intenta de nuevo.");
        console.error("Error en el registro:", response.errors);
      } else {
        console.log("Usuario registrado:", response);
        saveToken({ token: response.token });
        // Redirige al usuario a la página de inicio de sesión
        router.push("/"); // Redirecciona a login
      }
    } catch (error) {
      setError("Hubo un error inesperado. Intenta de nuevo.");
      console.error("Error inesperado:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionAuth
      title="Registrarse"
      idForm="register-form"
      handleSubmit={handleSubmit(onSubmit)}
      textFooter="¿Tienes cuenta?"
      linkHrefFooter="/accounts/login"
      linkNameFooter="Iniciar sesión"
    >
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>} {/* Mostrar error si hay uno */}

      <Input
        type="email"
        placeholder="Email"
        errorMessage={errors.email?.message}
        {...register("email", {
          required: "El correo electrónico es obligatorio",
          pattern: {
            value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,7}$/,
            message: "Formato de correo inválido",
          },
        })}
      >
        <HiOutlineMail size={24} />
      </Input>

      <Input
        type="text"
        placeholder="Usuario"
        errorMessage={errors.username?.message}
        {...register("username", { required: "El nombre de usuario es obligatorio" })}
      >
        <CiUser size={24} />
      </Input>

      <Input
        type="password"
        placeholder="Contraseña"
        errorMessage={errors.password?.message}
        {...register("password", {
          required: "La contraseña es obligatoria",
          minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" },
        })}
      >
        <FaRegEyeSlash size={24} />
      </Input>

      <BtnAuth text={loading ? "Registrando..." : "Registrarse"} disabled={loading} />
    </SectionAuth>
  );
};
