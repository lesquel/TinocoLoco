"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { isLogin } from "../utils/isLogin";

export const LoginLink = () => {
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    const [currentUrl, setCurrentUrl] = useState<string>("");

    useEffect(() => {
        setLoggedIn(isLogin()); 
        setCurrentUrl(window.location.href);

        // Si el estado de login cambia, se actualiza el estado
        const handleStorageChange = () => {
            setLoggedIn(isLogin());  // Vuelve a verificar el login
        };

        // Agregar el evento de escucha al localStorage (útil si login/logout afecta el almacenamiento)
        window.addEventListener('storage', handleStorageChange);

        // Limpiar el evento cuando el componente se desmonte
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    if (loggedIn === null) {
        // Mientras se determina el estado de login, no mostramos nada.
        return null;
    }

    return loggedIn ? (
        <Link
            className="py-3 px-6 bg-[#087E8B] text-white rounded-xl"
            href={`/accounts/logout`}
        >
            Logout
        </Link>
    ) : (
        <Link
            className="py-3 px-6 bg-[#087E8B] text-white rounded-xl"
            href={`/accounts/login?next=${encodeURIComponent(currentUrl)}`}
        >
            Login
        </Link>
    );
};

export default LoginLink;
