import { IUCategory } from "@/interfaces/IUservices";
import { useApiRequest } from "@/hooks/useApiRequest";
import { useCallback } from "react";
import { Chip } from "@nextui-org/react";
import { getServiceCategory } from "../services/services";

export function ChipCategory({ idCategory }: { idCategory: number }) {
  const fetchCategoryService = useCallback(
    () => getServiceCategory(idCategory),
    [idCategory],
  );
  const { data, error } = useApiRequest<IUCategory>(fetchCategoryService);

  if (error) {
    return <div>Error al obtener los datos</div>;
  }

  if (!data) {
    return <div>Cargando...</div>;
  }
  return (
    <div>
      Categoría: <Chip>{data.service_category_name.toUpperCase()}</Chip>
    </div>
  );
}
