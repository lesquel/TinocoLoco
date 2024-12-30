import { NavInfo } from "@/features/dashboard/components/navInfo";

export default function DashboardServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavInfo
        urls={[
          { url: "/dashboard/services", label: "Servicios" },
          { url: "/dashboard/services/create", label: "Crear Servicio" },
          { url: "/dashboard/services/categoty", label: "Categoría" },
          {
            url: "/dashboard/services/categoty/create",
            label: "Crear categoría",
          },
        ]}
      />
      <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto">

      {children}
      </div>
    </>
  );
}
