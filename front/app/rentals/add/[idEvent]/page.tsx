import { AddRentalForm } from "@/features/rentals/sections/addRentalForm";

interface Props {
  params: { idEvent: string }
}

export default function AddRental({ params }: Props) {
  const idEvent = parseInt(params.idEvent, 10)
  
  return (
    <div className="container mx-auto py-6">
      <AddRentalForm idEvent={idEvent} />
    </div>
  )
}

