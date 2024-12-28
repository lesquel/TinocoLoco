import { SidebarDashboard } from "@/features/dashboard/components/sliderbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SidebarDashboard />
      <div className="flex-1">{children}</div>
    </div>
  );
}
