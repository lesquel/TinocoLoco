import type { Metadata } from "next";
import { Header } from "@/components/section/laoyut/header"; // Asegúrate de que sea una función async

export const metadata: Metadata = {
  title: "Mi Aplicación",
  description: "Descripción generada automáticamente",
};

// Convertimos el layout en async para manejar el componente async Header
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ejecutamos Header como una función, ya que es asincrónica
  const header = await Header();

  return (
    <html lang="es">
      <body>
        {header} {/* Renderizamos el resultado del Header */}
        {children}
      </body>
    </html>
  );
}
