import { RentalSection } from "@/features/rentals/sections/RentalSection";

export default function RentalPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  return (
    <div className="w-full pt-4">
      <RentalSection id={id} />
    </div>
  );
}
