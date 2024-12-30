import { NavInfo } from "@/features/dashboard/components/navInfo";

export default function DashboardBusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavInfo
        urls={[
          { url: "/dashboard/business", label: "Business" },
          { url: "/dashboard/business/update", label: "Actualizar Business" },
        ]}
      />
      <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto">

      {children}
      </div>
    </>
  );
}
