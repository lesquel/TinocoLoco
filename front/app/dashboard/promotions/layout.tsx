import { NavInfo } from "@/features/dashboard/components/navInfo";

export default function DashboardServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <NavInfo
        urls={[
          { url: "/dashboard/promotions", label: "Promociones" },
        ]}
      /> */}
      <div>
        <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto">

      {children}
        </div>
      </div>
    </>
  );
}
