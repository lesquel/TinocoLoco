"use client";
import { useApiRequest } from "@/hooks/useApiRequest";
import { getMyRentals } from "../services/rentals";
import { CardRental } from "../components/cardRental";
import { useCallback } from "react";
import { RentalCardLoading } from "@/components/utils/loagins/rentalsCardLoding";
import { TitleSection } from "@/components/utils/titleSection";

export function AllRentals() {
  const fetchRentals = useCallback(
    () => getMyRentals({ options: { page_size: 5 } }),
    []
  );
  const { data, error, isLoading } = useApiRequest(fetchRentals);

  if (error) {
    return <div>Error al obtener los datos</div>;
  }

  if (isLoading) {
    return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      <RentalCardLoading />
      <RentalCardLoading />
      <RentalCardLoading />
      <RentalCardLoading />
    </div>;
  }
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {data?.results.map((rental) => (
          <CardRental key={rental.id} rental={rental} />
        ))}
      </div>
    </div>
  );
}
