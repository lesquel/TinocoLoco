import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Mi Aplicación",
  description: "Descripción generada automáticamente",
};

// Layout secundario que solo envuelve a los hijos sin <html> ni <body>
export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="account-layout">
      <main>{children}</main>
    </div>
  );
}
