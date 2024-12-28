"use client";
import React, { useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
} from "@nextui-org/react";
import { getRental } from "../services/rentals";
import { useApiRequest } from "@/hooks/useApiRequest";
import { IURental } from "@/interfaces/IURental";
import { InforShorts } from "@/features/events/components/inforShorts";
import { SectionReview } from "./review/SectionReview";

export function RentalSection({ id }: { id: number }) {
  const fetchRental = useCallback(() => getRental(id), []);
  const { data, error, isLoading } = useApiRequest<IURental>(fetchRental);

  if (error) {
    return <div>Error al obtener la renta</div>;
  }

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!data) {
    return <div>No se encontraron datos de la renta</div>;
  }
  if (data.errors){
    return <div>No se encontraron datos de la renta</div>;
  }

  return (
    <div>
      <div className="flex flex-row gap-6 items-center justify-center relative w-full">
        {/* Sección izquierda */}
        <div className="flex-1">
          <InforShorts idEvent={data.event} />
        </div>

        {/* Sección derecha */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Información de la Reserva</h2>
          {data.current_status.status === "pending" ? (
            <div>
              <Chip size="sm" color="danger" variant="solid">
                Pendiente
              </Chip>
              <p>
                Por favor, confirma la Reserva para poder realizar el reserva.
              </p>
              <Button color="primary">Confirmar</Button>
            </div>
          ) : (
            <Chip size="sm" color="primary" variant="solid">
              {data.current_status.status}
            </Chip>
          )}
          <Table aria-label="Información de la Reserva">
            <TableHeader>
              <TableColumn key="property">Propiedad</TableColumn>
              <TableColumn key="value">Valor</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="id">
                <TableCell>ID</TableCell>
                <TableCell>{data.id}</TableCell>
              </TableRow>
              <TableRow key="status">
                <TableCell>Estado actual</TableCell>
                <TableCell>{data.current_status.status}</TableCell>
              </TableRow>
              <TableRow key="date">
                <TableCell>Fecha del evento</TableCell>
                <TableCell>{data.event_rental_date}</TableCell>
              </TableRow>
              <TableRow key="start_time">
                <TableCell>Hora de inicio</TableCell>
                <TableCell>{data.event_rental_start_time}</TableCell>
              </TableRow>
              <TableRow key="end_time">
                <TableCell>Hora de finalización planificada</TableCell>
                <TableCell>{data.event_rental_planified_end_time}</TableCell>
              </TableRow>
              <TableRow key="cost">
                <TableCell>Costo</TableCell>
                <TableCell>${data.event_rental_cost}</TableCell>
              </TableRow>
              <TableRow key="payment_method">
                <TableCell>Método de pago</TableCell>
                <TableCell>{data.event_rental_payment_method}</TableCell>
              </TableRow>
              <TableRow key="attendees">
                <TableCell>Asistentes (min-max)</TableCell>
                <TableCell>{`${data.event_rental_min_attendees} - ${data.event_rental_max_attendees}`}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold">Reseñas</h2>
        <div>
          {data.costumer_rating?.rating_score}
          {data.costumer_rating?.rating_comment}
          {data.costumer_rating?.created_at}
        </div>
      </div>

      {!data.costumer_rating ? <SectionReview rentalId={id} /> : null}
    </div>
  );
}
