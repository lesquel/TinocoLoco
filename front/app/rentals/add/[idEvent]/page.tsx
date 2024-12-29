import { TitleSection } from "@/components/utils/titleSection";
import { InforShorts } from "@/features/events/components/inforShorts";
import { AddRentalForm } from "@/features/rentals/sections/addRentalForm";

interface Props {
  params: { idEvent: string };
}

export default function AddRental({ params }: Props) {
  const idEvent = parseInt(params.idEvent, 10);

  return (
    <div className="container mx-auto py-6 flex flex-col md:flex-row justify-center relative gap-6">
      <div className="sticky top-20 ">
        <TitleSection description="Evento" title="" />
        <InforShorts idEvent={idEvent} />
      </div>
      <AddRentalForm idEvent={idEvent} />
    </div>
  );
}
