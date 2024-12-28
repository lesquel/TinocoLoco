"use client";

import { getBusiness } from "@/features/business/services/businessServices";
import { useApiRequest } from "@/hooks/useApiRequest";
import { IUBusiness } from "@/interfaces/IUBusiness";
import Image from "next/image";
import { Skeleton } from "@nextui-org/react";

export const Logo = () => {
  const { data, error, isLoading } = useApiRequest<IUBusiness>(getBusiness);

  if (error) {
    return <p className="text-danger">Error al cargar el logo</p>;
  }

  if (isLoading || !data) {
    return <Skeleton className="w-24 h-8 rounded-lg" />;
  }

  if (!data.business_logo_url) {
    return <h2 className="text-xl font-bold">{data.business_name}</h2>;
  }

  return (
    <div className="h-[50px]">
      {" "}
      {/* Contenedor con altura fija */}
      <Image
        src={data.business_logo_url}
        alt={`${data.business_name} logo`}
        width={150}
        height={50}
        className="object-contain w-auto h-full"
      />
    </div>
  );
};
