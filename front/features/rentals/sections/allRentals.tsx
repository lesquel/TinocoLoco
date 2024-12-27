"use client";
import { useApiRequest } from "@/hooks/useApiRequest";
import { getMyRentals } from "../services/rentals";
import { CardRental } from "../components/cardRental";

export function AllRentals() {
    const { data, error, isLoading } = useApiRequest(getMyRentals);

    if (error) {
        return <div>Error al obtener los datos</div>;
    }

    if (isLoading) {
        return <div>Cargando...</div>;
    }
    return (
        <div>
            {data?.results.map((rental) => (
                <CardRental key={rental.id} rental={rental} />
            ))}
        </div>
    )
}