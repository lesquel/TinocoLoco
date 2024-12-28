import { useApiRequest } from "@/hooks/useApiRequest";
import { getEvent } from "../services/events";
import { useCallback } from "react";
import NoFountEvent from "@/public/images/no_fount_events.jpg";
import { Image } from "@nextui-org/react";
import { ImageCarousel } from "@/components/utils/carucelImg";

export function InforShorts({ idEvent }: { idEvent: number }) {
  const fetchEvent = useCallback(() => getEvent(idEvent), []);
  const { data, error, isLoading } = useApiRequest(fetchEvent);
  if (error) {
    return <div>Error al obtener los datos</div>;
  }
  if (!data) {
    return <div>Cargando...</div>;
  }
  return (
    <div className="flex flex-col gap-4 mt-4">
      <h2 className="text-2xl font-bold">
        Información del evento {data.event_name}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <ImageCarousel images={data.photos} />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Costo:</h3>
          <p>{data.event_reference_value}</p>
        </div>
      </div>
    </div>
  );
}
