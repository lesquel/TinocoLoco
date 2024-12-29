import { NextResponse } from "next/server";

import { getTokenFromCookie } from "@/features/auth/utils/getUserInfo";

export const isLoggedInRequired = () => {
  if (typeof window === "undefined") return; // Evitar SSR
  const token = getTokenFromCookie();

  if (!token) {
    NextResponse.redirect(new URL("/accounts/login", window.location.href));
    NextResponse.next();
  }
};
