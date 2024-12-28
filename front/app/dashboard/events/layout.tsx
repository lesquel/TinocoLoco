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
          { url: "/dashboard/events/categoty", label: "Categoría" },
          {
            url: "/dashboard/events/categoty/create",
            label: "Crear categoría",
          },
        ]}
      />
      {children}
    </>
  );
}
