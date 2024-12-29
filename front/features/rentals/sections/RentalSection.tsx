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
  Image,
  Divider,
} from "@nextui-org/react";
import { getRental, addReview } from "../services/rentals";
import { useApiRequest } from "@/hooks/useApiRequest";
import { IURental } from "@/interfaces/IURental";
import { InforShorts } from "@/features/events/components/inforShorts";
import { SectionReview } from "./review/SectionReview";
import { TitleSection } from "@/components/utils/titleSection";
import { InfoShortsServices } from "@/features/services/utils/infoShortsServices";
import { TableLoading } from "@/components/utils/loagins/tableLoading";
import { RentalCardLoading } from "@/components/utils/loagins/rentalsCardLoding";
import { ReviewsLoading } from "@/components/utils/loagins/reviewsLoading";
import { getTokenFromCookie } from "@/features/auth/utils/getUserInfo";
import { Role } from "@/interfaces/IUser";
import { ReviewForm } from "@/components/utils/reviews/ReviewForm";
import { useRouter } from "next/navigation";

export function RentalSection({ id }: { id: number }) {
  const [addedReviews, setAddedReviews] = useState(0);
  const router = useRouter();

  const fetchRental = useCallback(() => getRental(id), [id]);
  const { data, error, isLoading } = useApiRequest<IURental>(fetchRental);

  const handleReviewAdded = useCallback(() => {
    setAddedReviews((prev) => prev + 1);
    router.push(`/rentals/${id}`);
  }, [id, router]);

  if (error) {
    return (
      <Card className="p-6">
        <CardBody>
          <p className="text-center text-danger">Error al obtener la renta</p>
        </CardBody>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4 w-full flex-wrap flex-col">
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
      </div>
    );
  }

  if (!data || data.errors) {
    return (
      <Card className="p-6">
        <CardBody>
          <p className="text-center">No se encontraron datos de la renta</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <CardHeader>
          <TitleSection title="Información de" description=" la Reserva" />
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
                  {data.event_rental_services.length > 0 ? (
                    data.event_rental_services.map((service) => (
                      <InfoShortsServices key={service} idService={service} />
                    ))
                  ) : (
                    <p>No hay servicios asociados a esta renta</p>
                  )}
                </CardBody>
              </Card>
            </div>

            {/* Sección derecha */}
            <div>
              <Card className="p-4">
                <CardHeader className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Detalles de la Reserva</h3>
                  {data.current_status.status === "pending" ? (
                    <Chip size="sm" color="warning" variant="dot">Pendiente</Chip>
                  ) : (
                    <Chip size="sm" color="success" variant="dot">{data.current_status.status}</Chip>
                  )}
                </CardHeader>
                <CardBody>
                  {data.current_status.status === "pending" && (
                    <div className="mb-4">
                      <p className="mb-2">Por favor, confirma la Reserva para poder realizarla.</p>
                      <Button color="primary">Confirmar</Button>
                    </div>
                  )}
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
          {data.costumer_rating && <SectionReview item={data.costumer_rating} />}
          {data.owner_rating && <SectionReview item={data.owner_rating} />}
          {!data.owner_rating && getTokenFromCookie()?.user.role === Role.ADMIN && (
            <ReviewForm
              id={id}
              fetchData={addReview}
              onReviewAdded={handleReviewAdded}
            />
          )}
          {!data.costumer_rating && getTokenFromCookie()?.user.role !== Role.ADMIN && (
            <ReviewForm
              id={id}
              fetchData={addReview}
              onReviewAdded={handleReviewAdded}
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
}
