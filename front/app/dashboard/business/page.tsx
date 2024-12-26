import { TitleSection } from "@/components/utils/titleSection";
import { TableBusiness } from "@/features/business/components/tableBussines";

export default function BusinessPage() {
  
  return (
    <div className="max-w-[700px] w-full mx-auto px-4 mt-4">
        <TitleSection title="Información "  description="de la empresa" />
        <TableBusiness />
    </div>
  );
}

