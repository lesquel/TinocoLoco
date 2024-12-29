import Cookies from "js-cookie";

import { IUUser } from "@/interfaces/IUser";
export const getTokenFromCookie = (): IUUser | null => {
  const token = Cookies.get("authToken");

  if (!token) {
    return null; // Devuelve un objeto vacío si no se encuentra el token
  }
  try {
    return JSON.parse(token); // Intentar parsear el token
  } catch (error) {
    console.error("Error al parsear el token de la cookie:", error);

    return null; // Devuelve un objeto vacío si hay un error
  }
};
