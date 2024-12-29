import { useCallback } from "react";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";

import { getService } from "../services/services";

import { useApiRequest } from "@/hooks/useApiRequest";
import NoFountEvent from "@/public/images/no_fount_events.jpg";
import { CardLoadingBasic } from "@/components/utils/loagins/cardLoading";
import { IUService } from "@/interfaces/IUservices";
import { getServicesToRental } from "@/features/rentals/services/rentals";

 const InfoShortsServices = ({ data }: { data: IUService }) => {

  return (
    <Card className="my-4 max-w-sm">
      <Link href={`/rentals/${data.id}`} className="hover:scale-105 transition-all">
        <CardHeader className="flex-col items-start">
          <h4 className="font-bold text-large">{data.service_name}</h4>
          <p className="text-small text-default-500">
            Costo: ${data.service_unitary_cost}
          </p>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt={`Imagen de ${data.service_name}`}
            className="object-cover rounded-xl"
            height={200}
            src={data.photos && data.photos.length > 0 ? data.photos[0].image_url : NoFountEvent.src}
            width={300}
          />
          <p className="text-small mt-2">{data.service_description}</p>
        </CardBody>
      </Link>

    </Card>
  );
};



export const AllInfoShortsServices = ({
  idRental,
}:{
  idRental: number
}) => {
  const fetchServices = useCallback(() => getServicesToRental({ rentalId: idRental }), [idRental]);
  const { data, error, isLoading } = useApiRequest(fetchServices);

  if (error) {
    return <div className="text-danger">Error al obtener los servicios</div>;
  }

  if (isLoading) {
    return <CardLoadingBasic />;
  }
  if (!data) {
    return (
      <div className="text-default-500">
        No se encontraron datos de los servicios
      </div>
    );
  }

  return (
    <div>
      {data.map((item) => (
        <InfoShortsServices key={item.id} data={item.service} />
      ))}
    </div>
  );
}