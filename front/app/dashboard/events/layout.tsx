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
          { url: "/dashboard/events/category", label: "Categoría" },
         
        ]}
      />
      <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto">
      {children}

      </div>
    </>
  );
}
