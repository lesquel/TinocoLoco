import { NavInfo } from "@/features/dashboard/components/navInfo";

export default function DashboardBusinessLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavInfo urls={[
                { url: "/dashboard/business", label: "Business" },
                { url: "/dashboard/business/update", label: "Actualizar Business" },
            ]} />
            {children}
        </>
    );
}