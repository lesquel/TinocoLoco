import { Link } from "@nextui-org/react";
import { MdAlternateEmail } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";

import { ConfigurationBusiness } from "@/interfaces/IUBusiness";

interface LinkProps {
  name: string;
  value: string;
  icon: React.ReactNode;
}

const ContactLink: React.FC<LinkProps> = ({ name, value, icon }) => (
  <Link className="flex items-center space-x-2 hover:underline" href={value}>
    {icon}
    <span>{name}</span>
  </Link>
);

export const ContactInfo: React.FC<{ business: ConfigurationBusiness }> = ({
  business,
}) => (
  <div className="flex flex-col gap-4 items-center">
    <h2 className="text-lg font-medium text-foreground">Contacto</h2>
    <ul className="mt-4 space-y-2 text-foreground-700">
      {business.business_email && (
        <ContactLink
          icon={<MdAlternateEmail className="h-6 w-6" />}
          name="Email"
          value={`mailto:${business.business_email}`}
        />
      )}
      {business.business_phone_number && (
        <ContactLink
          icon={<CiPhone className="h-6 w-6" />}
          name="Teléfono"
          value={`tel:${business.business_phone_number}`}
        />
      )}
      {business.business_website_url && (
        <ContactLink
          icon={<TbWorld className="h-6 w-6" />}
          name="Sitio web"
          value={business.business_website_url}
        />
      )}
    </ul>
  </div>
);
