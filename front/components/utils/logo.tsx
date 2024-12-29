"use client";

import Image from "next/image";
import { Skeleton } from "@nextui-org/react";

import { getBusiness } from "@/features/business/services/businessServices";
import { useApiRequest } from "@/hooks/useApiRequest";
import { IUBusiness } from "@/interfaces/IUBusiness";

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
        alt={`${data.business_name} logo`}
        className="object-contain max-w-[150px] max-h-[50px] w-auto h-full"
        height={50}
        src={data.business_logo_url}
        width={70}
      />
    </div>
  );
};
