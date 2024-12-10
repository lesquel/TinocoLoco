"use client"; // Asegúrate de que este componente se ejecute en el cliente

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLogin } from "@/features/auth/utils/isLogin";
import { Login } from "@/features/auth/pages/login";
import authBG from "@/../public/images/authBG.jpg";

export default function Page({ params }: { params: { next: string } }) {
    const router = useRouter();

    // Asegúrate de redirigir solo después de que el componente esté montado
    useEffect(() => {
        if (isLogin()) {
            router.push("/"); // Redirige al inicio si el usuario ya está logueado
        }
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div
                className="bg-center bg-no-repeat bg-cover w-full h-full"
                style={{ backgroundImage: `url(${authBG.src})` }}
            />
            <Login params={params} />
        </div>
    );
}
