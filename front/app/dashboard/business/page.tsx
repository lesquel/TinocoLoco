import { TitleSection } from "@/components/utils/titleSection";
import { TableBusiness } from "@/features/business/components/tableBussines";

export default function BusinessPage() {
  return (
    <div className="max-w-[700px] w-full mx-auto px-4 mt-4">
      <TitleSection description="de la empresa" title="Información " />
      <TableBusiness />
    </div>
  );
}
