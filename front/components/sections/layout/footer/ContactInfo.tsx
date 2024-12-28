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
  <Link href={value} className="flex items-center space-x-2 hover:underline">
    {icon}
    <span>{name}</span>
  </Link>
);

export const ContactInfo: React.FC<{ business: ConfigurationBusiness }> = ({
  business,
}) => (
  <div>
    <h2 className="text-lg font-medium text-foreground">Contacto</h2>
    <ul className="mt-4 space-y-2 text-foreground-700">
      {business.business_email && (
        <ContactLink
          name="Email"
          value={`mailto:${business.business_email}`}
          icon={<MdAlternateEmail className="h-6 w-6" />}
        />
      )}
      {business.business_phone_number && (
        <ContactLink
          name="Teléfono"
          value={`tel:${business.business_phone_number}`}
          icon={<CiPhone className="h-6 w-6" />}
        />
      )}
      {business.business_website_url && (
        <ContactLink
          name="Sitio web"
          value={business.business_website_url}
          icon={<TbWorld className="h-6 w-6" />}
        />
      )}
    </ul>
  </div>
);
