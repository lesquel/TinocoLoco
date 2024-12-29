import { Link } from "@nextui-org/react";
import { CiFacebook, CiInstagram } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";

import { ConfigurationBusiness } from "@/interfaces/IUBusiness";

interface SocialLinkProps {
  name: string;
  value: string;
  icon: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ name, value, icon }) => (
  <Link aria-label={name} className="text-white hover:text-[#F43F5E]" href={value}>
    {icon}
  </Link>
);

export const SocialMedia: React.FC<{ business: ConfigurationBusiness }> = ({
  business,
}) => (
  <div className="flex flex-col gap-4 items-center">
    <h2 className="text-lg font-medium text-foreground">Síguenos</h2>
    <div className="mt-4 flex space-x-4">
      {business.business_facebook_url && (
        <SocialLink
          icon={<CiFacebook className="h-8 w-8" />}
          name="Facebook"
          value={business.business_facebook_url}
        />
      )}
      {business.business_instagram_url && (
        <SocialLink
          icon={<CiInstagram className="h-8 w-8" />}
          name="Instagram"
          value={business.business_instagram_url}
        />
      )}
      {business.business_x_url && (
        <SocialLink
          icon={<FaXTwitter className="h-8 w-8" />}
          name="Twitter"
          value={business.business_x_url}
        />
      )}
    </div>
  </div>
);
