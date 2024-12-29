import { TitleSection } from "@/components/utils/titleSection";
import { FormBusiness } from "@/features/business/components/formBussiness";

export default function UpdateBusiness() {
  return (
    <div className="flex flex-col items-center justify-center  relative">
      <div className="max-w-[700px] w-full mx-auto px-4 mt-4">
        <TitleSection
          description="Información de la empresa"
          title="Actualizar "
        />
        <FormBusiness />
      </div>
    </div>
  );
}
