"use client";

import { useCallback } from "react";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";

import { getEvent } from "../services/events";

import { useApiRequest } from "@/hooks/useApiRequest";
import NoFountEvent from "@/public/images/no_fount_events.jpg";
import { CardLoadingBasic } from "@/components/utils/loagins/cardLoading";
import Link from "next/link";
import { notFound } from "next/navigation";

export function InforShorts({ idEvent }: { idEvent: number }) {
  const fetchEvent = useCallback(() => getEvent(idEvent), [idEvent]);
  const { data, error, isLoading } = useApiRequest(fetchEvent);

  if (error) notFound()
  if (!data) notFound()

  if (isLoading) {
    return (
      <div>
        <CardLoadingBasic />
      </div>
    );
  }


  return (
    <Card className="max-w-sm mx-auto">
      <Link href={`/events/${data.id}`} className="hover:scale-105 transition-all">
        <CardHeader className="flex-col items-start">
          <h4 className="font-bold text-large">{data.event_name}</h4>
          <p className="text-small text-default-500">
            Costo: ${data.event_reference_value}
          </p>
        </CardHeader>
        <CardBody className="overflow-visible py-2 flex justify-center items-center">
          <Image
            alt={`Imagen de ${data.event_name}`}
            className="object-cover rounded-xl"
            height={200}
            src={
              data.photos && data.photos.length > 0
                ? data.photos[0].image_url
                : NoFountEvent.src
            }
            width={300}
          />
          <p className="text-small mt-2">{data.event_description}</p>
        </CardBody>
      </Link>
    </Card>
  );
}
