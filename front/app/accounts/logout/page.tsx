"use client"; // Asegúrate de que este componente se ejecute en el cliente

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Usa el enrutador de Next.js
import { logout } from "@/features/auth/utils/logout";
import { isLogin } from "@/features/auth/utils/isLogin";
import Link from "next/link";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    if (isLogin()) {
      logout();
      window.location.href = "/"; // Redirecciona al usuario a la página de inicio
    } else {
      router.push("/accounts/login");
    }
  }, [router]);

  return (
    <div>
      <h1>Se ha cerrado la sesión</h1>
      <p>Puedes volver a iniciar sesión</p>
      <Link href={"/"}>Home</Link>
    </div>
  );
}
