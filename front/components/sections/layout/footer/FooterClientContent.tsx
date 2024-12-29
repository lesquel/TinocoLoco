"use client";

import { ContactInfo } from "./ContactInfo";
import { SocialMedia } from "./SocialMedia";

import { useApiRequest } from "@/hooks/useApiRequest";
import { getBusiness } from "@/features/business/services/businessServices";
import { Skeleton } from "@nextui-org/react";

export function FooterClientContent() {
  const { data, error, isLoading } = useApiRequest(getBusiness);
  const business = data;

  if (error) {
    return (
      <div className="text-danger">Error cargando la informacion del neogio</div>
    );
  }

  if (isLoading) {
    return (
      <>
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-lg font-medium text-foreground">Contacto</h2>
          <Skeleton className="w-[100px] h-10 rounded-lg" />
          <Skeleton className="w-[100px] h-10 rounded-lg" />
          <Skeleton className="w-[100px] h-10 rounded-lg" />
          <Skeleton className="w-[100px] h-10 rounded-lg" />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-lg font-medium text-foreground">Contacto</h2>
          <Skeleton className="w-[100px] h-10 rounded-lg" />
          <Skeleton className="w-[100px] h-10 rounded-lg" />
          <Skeleton className="w-[100px] h-10 rounded-lg" />
          <Skeleton className="w-[100px] h-10 rounded-lg" />
        </div>
        <div className="mt-16 border-t border-divider pt-8 col-span-full w-full">
          <div className="w-full text-center">
            <div className="text-sm text-foreground-500 flex justify-center items-center gap-2 w-full">
              <Skeleton className="w-[50px] h-8 rounded-lg inline" /> Todos los
              derechos reservados.
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!business) {
    return <div className="text-foreground-600">No se encontró información del negocio...</div>;
  }

  return (
    <>
      <ContactInfo business={business} />
      <SocialMedia business={business} />
      <div className="mt-16 border-t border-divider pt-8 col-span-full">
        <div className="w-full text-center">
          <p className="text-sm text-foreground-500">
            &copy; {new Date().getFullYear()} {business.business_name}. Todos
            los derechos reservados.
          </p>
        </div>
      </div>
    </>
  );
}
