"use client";

import { getTokenFromCookie } from "@/features/auth/utils/getUserInfo";

export const isLogin = () => {
  if (typeof window === "undefined") return false; // Evitar SSR

  return !!getTokenFromCookie(); // Retorna true si el usuario está autenticado
};
