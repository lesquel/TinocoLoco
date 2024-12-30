import { NavInfo } from "@/features/dashboard/components/navInfo";

export default function DashboardEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavInfo
        urls={[
          { url: "/dashboard/events", label: "Eventos" },
          { url: "/dashboard/events/create", label: "Crear evento" },
          { url: "/dashboard/events/category", label: "Categoría" },
          {
            url: "/dashboard/events/category/create",
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
