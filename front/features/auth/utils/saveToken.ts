
import Cookies from "js-cookie";

export const saveToken = ({ token }: { token: string }) => {
  if (!token) {
    console.error("Token inválido. No se puede guardar.");
    return;
  }
  Cookies.set("authToken", token, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: 7,
  });
};
