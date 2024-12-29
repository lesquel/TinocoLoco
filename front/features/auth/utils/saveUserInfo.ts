import Cookies from "js-cookie";

import { IUUser } from "@/interfaces/IUser";
export const saveToken = (userInfo: IUUser) => {
  if (!userInfo.token) {
    console.error("Token inválido. No se puede guardar.");

    return;
  }

  // Asegúrate de que el token sea un string antes de guardarlo
  const tokenData = JSON.stringify(userInfo);

  Cookies.set("authToken", tokenData, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: 7,
  });
};
