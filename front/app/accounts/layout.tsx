import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Mi Aplicación - Cuenta",
  description: "Sección de cuenta de la aplicación",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex max-w-6xl mx-auto">{children}</div>;
}
