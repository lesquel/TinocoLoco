"use client";

import { ContactInfo } from "./ContactInfo";
import { SocialMedia } from "./SocialMedia";

import { useApiRequest } from "@/hooks/useApiRequest";
import { getBusiness } from "@/features/business/services/businessServices";

export function FooterClientContent() {
  const { data, error, isLoading } = useApiRequest(getBusiness);
  const business = data;

  if (error) {
    return (
      <div className="text-danger">Error loading business information</div>
    );
  }

  if (isLoading) {
    return <div className="text-foreground-600">Loading business data...</div>;
  }

  if (!business) {
    return <div className="text-foreground-600">Loading business data...</div>;
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
