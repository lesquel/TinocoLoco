"use client";
import { useApiRequest } from "@/hooks/useApiRequest";
import { getMyRentals } from "../services/rentals";
import { CardRental } from "../components/cardRental";
import { useCallback } from "react";

export function AllRentals() {
  const fetchRentals = useCallback(
    () => getMyRentals({ options: { page_size: 5 } }),
    [],
  );
  const { data, error, isLoading } = useApiRequest(fetchRentals);

  if (error) {
    return <div>Error al obtener los datos</div>;
  }

  if (isLoading) {
    return <div>Cargando...</div>;
  }
  return (
    <div className="flex flex-col gap-4">
      {data?.results.map((rental) => (
        <CardRental key={rental.id} rental={rental} />
      ))}
    </div>
  );
}
