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
  <Link href={value} className="hover:text-primary" aria-label={name}>
    {icon}
  </Link>
);

export const SocialMedia: React.FC<{ business: ConfigurationBusiness }> = ({ business }) => (
  <div>
    <h2 className="text-lg font-medium text-foreground">Síguenos</h2>
    <div className="mt-4 flex space-x-4">
      {business.business_facebook_url && (
        <SocialLink name="Facebook" value={business.business_facebook_url} icon={<CiFacebook className="h-6 w-6" />} />
      )}
      {business.business_instagram_url && (
        <SocialLink name="Instagram" value={business.business_instagram_url} icon={<CiInstagram className="h-6 w-6" />} />
      )}
      {business.business_x_url && (
        <SocialLink name="Twitter" value={business.business_x_url} icon={<FaXTwitter className="h-6 w-6" />} />
      )}
    </div>
  </div>
);