'use client'

import { useApiRequest } from "@/hooks/useApiRequest";
import { getBusiness } from "@/features/business/services/businessServices";
import { ContactInfo } from "./ContactInfo";
import { SocialMedia } from "./SocialMedia";

export function FooterClientContent() {
  const { data, error, isLoading } = useApiRequest(getBusiness);
  const business = data;

  if (error) {
    return <div className="text-danger">Error loading business information</div>;
  }

  if (isLoading || !business) {
    return <div className="text-foreground-600">Loading business data...</div>;
  }

  return (
    <>
      <ContactInfo business={business} />
      <SocialMedia business={business} />
      <div className="mt-16 border-t border-divider pt-8">
        <div className="w-full text-center">
          <p className="text-sm text-foreground-500">
            &copy; {new Date().getFullYear()} {business.business_name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </>
  );
}
