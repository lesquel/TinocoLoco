"use client"; // Asegúrate de que este componente se ejecute en el cliente

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Usa el enrutador de Next.js
import { Input } from "@/features/auth/components/input";
import { SectionAuth } from "@/features/auth/components/sectionAuth";
import { BtnAuth } from "@/features/auth/components/btnAuth";
import { useForm } from "react-hook-form";
import { IURegister } from "@/services/interfaces/IUauth";
import { login as loginService } from "@/features/auth/services/auth";
import { CiUser } from "react-icons/ci";
import { FaRegEyeSlash } from "react-icons/fa6";
import { saveToken } from "@/features/auth/utils/saveToken";
import { isLoggedInRequired } from "@/features/auth/utils/isLoggedInRequired";

export const Login = ({ params }: { params: { next: string } }) => {
    const [loading, setLoading] = useState(false); // Estado de carga
    const [error, setError] = useState<string | null>(null); // Estado de error
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<IURegister>();

    // Lógica de validación de sesión que solo se debe ejecutar en el cliente
    useEffect(() => {
        isLoggedInRequired();
    }, []); // Esto se ejecutará solo después de que el componente haya sido montado

    const onSubmit = async (data: IURegister) => {
        setLoading(true); // Activar estado de carga
        setError(null); // Resetear el error antes de intentar el login

        try {
            const response = await loginService(data);
            if (response.token) {
                saveToken({ token: response.token });
                router.push(params.next || "/"); // Redirige a la página de inicio o a la página 'next'
            } else {
                setError("Credenciales incorrectas. Intenta de nuevo.");
            }
        } catch (error) {
            setError("Hubo un error inesperado. Intenta de nuevo.");
            console.error("Error durante el login:", error);
        } finally {
            setLoading(false); // Desactivar estado de carga
        }
    };

    return (
        <SectionAuth
            title="Iniciar Sesión"
            idForm="login-form"
            handleSubmit={handleSubmit(onSubmit)}
            textFooter="¿No tienes cuenta?"
            linkHrefFooter="/accounts/register"
            linkNameFooter="Registrarse"
        >
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>} {/* Mostrar mensaje de error */}

            <Input
                type="text"
                placeholder="Usuario"
                {...register("username", { required: "El nombre de usuario es obligatorio" })}
                errorMessage={errors.username?.message}
            >
                <CiUser size={24} />
            </Input>
            <Input
                type="password"
                placeholder="Contraseña"
                {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" },
                })}
                errorMessage={errors.password?.message}
            >
                <FaRegEyeSlash size={24} />
            </Input>
            <BtnAuth text={loading ? "Iniciando sesión..." : "Iniciar Sesión"} disabled={loading} />
        </SectionAuth>
    );
};
