"use client"; // Asegúrate de que este componente se ejecute en el cliente

import { useEffect } from "react";
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
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<IURegister>();

    // Lógica de validación de sesión que solo se debe ejecutar en el cliente
    useEffect(() => {
        isLoggedInRequired();
    }, []); // Esto se ejecutará solo después de que el componente haya sido montado

    const onSubmit = async (data: IURegister) => {
        try {
            const response = await loginService(data);
            if (response.token) {
                saveToken({ token: response.token });
                router.push(params.next || "/"); // Redirige a la página de inicio o a la página 'next'
            }
        } catch (error) {
            console.error("Error during login:", error);
            // Aquí puedes mostrar un mensaje de error al usuario
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
            <BtnAuth text="Iniciar Sesión" />
        </SectionAuth>
    );
};
