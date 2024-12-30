"use client";

import React, { useCallback, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { notFound, useRouter } from "next/navigation";

import { getRental, addReview } from "../services/rentals";

import { SectionReview } from "./review/SectionReview";

import { useApiRequest } from "@/hooks/useApiRequest";
import { IURental } from "@/interfaces/IURental";
import { InforShorts } from "@/features/events/components/inforShorts";
import { TitleSection } from "@/components/utils/titleSection";
import { AllInfoShortsServices } from "@/features/services/utils/infoShortsServices";
import { TableLoading } from "@/components/utils/loagins/tableLoading";
import { RentalCardLoading } from "@/components/utils/loagins/rentalsCardLoding";
import { ReviewsLoading } from "@/components/utils/loagins/reviewsLoading";
import { getTokenFromCookie } from "@/features/auth/utils/getUserInfo";
import { Role } from "@/interfaces/IUser";
import { ReviewForm } from "@/components/utils/reviews/ReviewForm";
import { ModalVerifyEmailRental } from "../utils/modalVeridyEmailRental";
import NotFound from "@/app/404";

export function RentalSection({ id }: { id: number }) {
  const [addedReviews, setAddedReviews] = useState(0);
  const router = useRouter();

  const fetchRental = useCallback(() => getRental(id), [id, addedReviews]);
  const { data, error, isLoading } = useApiRequest<IURental>(fetchRental);

  const handleReviewAdded = useCallback(() => {
    setAddedReviews((prev) => prev + 1);
  }, []);

  if (error) notFound()

  if (isLoading) {
    return (
      <Card className="flex items-center justify-center p-4 w-full flex-wrap flex-col">
        <TitleSection description=" la Reserva" title="Información de" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <div>
            <RentalCardLoading />
          </div>
          <div>
            <TableLoading columns={5} rows={10} />
          </div>
        </div>
        <div className="max-w-xl mx-auto mt-4">
          <ReviewsLoading />
        </div>
      </Card>
    );
  }


  return (
    <div className="space-y-8">
      <Card className="p-6">
        <CardHeader className="flex justify-between items-center flex-col">
          <TitleSection description=" la Reserva" title="Información de" />
          {data.current_status.status === "pending" && (
                    <div className="mb-4 flex flex-col justify-center items-center gap-2">
                      <p className="mb-2">
                        Para realizar la reserva, por favor, confirma la Reserva.
                      </p>
                      <ModalVerifyEmailRental rentalId={id} />
                    </div>
                  )}
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sección izquierda */}
            <div>
              <Card className="p-4">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Evento</h3>
                </CardHeader>
                <CardBody>
                  <InforShorts idEvent={data.event} />
                </CardBody>
              </Card>
              <Divider className="my-4" />
              <Card className="p-4">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Servicios</h3>
                </CardHeader>
                <CardBody>
                  <AllInfoShortsServices idRental={data.id} />
                </CardBody>
              </Card>
            </div>

            {/* Sección derecha */}
            <div>
              <Card className="p-4">
                <CardHeader className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Detalles de la Reserva</h3>
                  {data.current_status.status === "pending" ? (
                    <Chip color="warning" size="sm" variant="dot">
                      Pendiente
                    </Chip>
                  ) : (
                    <Chip color="success" size="sm" variant="dot">
                      {data.current_status.status}
                    </Chip>
                  )}
                </CardHeader>
                <CardBody>
                  
                  <Table aria-label="Información de la Reserva" className="mt-4">
                    <TableHeader>
                      <TableColumn>Propiedad</TableColumn>
                      <TableColumn>Valor</TableColumn>
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
                </CardBody>
              </Card>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="p-6">
        <CardHeader>
          <h2 className="text-2xl font-bold">Reseñas de la Reserva</h2>
        </CardHeader>
        <CardBody>
          {data.costumer_rating && (
            <SectionReview item={data.costumer_rating} />
          )}
          {data.owner_rating && <SectionReview item={data.owner_rating} />}
          {!data.owner_rating &&
            getTokenFromCookie()?.user.role === Role.ADMIN && (
              <ReviewForm
                fetchData={addReview}
                id={id}
                onReviewAdded={handleReviewAdded}
              />
            )}
          {!data.costumer_rating &&
            getTokenFromCookie()?.user.role !== Role.ADMIN && (
              <ReviewForm
                fetchData={addReview}
                id={id}
                onReviewAdded={handleReviewAdded}
              />
            )}
        </CardBody>
      </Card>
    </div>
  );
}
