import { getTokenFromCookie } from "@/features/auth/utils/getToken";
import { NextResponse } from "next/server";

export const loginRequired = () => {
  if (typeof window === "undefined") return; // Evitar SSR
  const token = getTokenFromCookie();

  if (!token) {
    NextResponse.redirect(new URL("/accounts/login", window.location.href));
    NextResponse.next();
    return true; // Indica que el usuario no está autenticado
  }

  return false; // Usuario autenticado
};
