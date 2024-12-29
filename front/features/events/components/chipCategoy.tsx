import { useCallback } from "react";
import { Chip } from "@nextui-org/react";

import { getCategory } from "../services/events";

import { IUCategory } from "@/interfaces/IUevents";
import { useApiRequest } from "@/hooks/useApiRequest";

export function ChipCategory({ idCategory }: { idCategory: number }) {
  const fetchCategory = useCallback(
    () => getCategory(idCategory),
    [idCategory],
  );
  const { data, error } = useApiRequest<IUCategory>(fetchCategory);

  if (error) {
    return <div>Error al obtener los datos</div>;
  }

  if (!data) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      Categoría: <Chip>{data.event_category_name.toUpperCase()}</Chip>
    </div>
  );
}
