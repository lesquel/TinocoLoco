import { TitleSection } from "@/components/utils/titleSection";
import { AllRentals } from "@/features/rentals/sections/allRentals";

export default function Rentals() {
  return (
    <div className="flex flex-col items-center justify-center  relative">
      <TitleSection title="Mis Rentas" description="Eventos" />
      <AllRentals />
    </div>
  );
}
