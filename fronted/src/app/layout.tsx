import { getBusiness } from "@/features/business/services/businessServices";
import { Header } from "@/components/section/laoyut/header";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mi Aplicación",
  description: "Descripción generada automáticamente",
};

async function BusinessHeader() {
  const { configuration } = await getBusiness();
  return <Header business={configuration} />;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-white text-black container mx-auto">
        {/* Renderizamos el componente asíncrono */}
        <BusinessHeader />
        {children}
      </body>
    </html>
  );
}
