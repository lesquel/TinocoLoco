'use client'

import { useApiRequest } from "@/hooks/useApiRequest";
import { getBusiness } from "@/features/business/services/businessServices";
import { Link } from "@nextui-org/react";
import { ConfigurationBusiness } from "@/interfaces/IUBusiness"
import { MdAlternateEmail } from "react-icons/md"
import { CiFacebook, CiPhone, CiInstagram } from "react-icons/ci"
import { TbWorld } from "react-icons/tb"
import { FaXTwitter } from "react-icons/fa6"

const Links: React.FC<{ name: string, value: string, icon?: React.ReactNode }> = ({ name, value, icon }) => {
    return (
        <Link href={value} className="hover:underline">
            {icon}
        </Link>
    )
}
export function ContactInfo({ business }: { business: ConfigurationBusiness }) {
    return (
        <div>
            <h2 className="text-lg font-medium text-foreground">Contacto</h2>
            <ul className="mt-4 space-y-2 text-foreground-700">
                {business.business_email && <Links name="Email" value={business.business_email} icon={<MdAlternateEmail className="h-6 w-6" />} />}
                {business.business_phone_number && <Links name="Teléfono" value={business.business_phone_number} icon={<CiPhone className="h-6 w-6" />} />}
                {business.business_website_url && <Links name="Sitio web" value={business.business_website_url} icon={<TbWorld className="h-6 w-6" />} />}
            </ul>
        </div>
    );
}


const SocialMedia = ({ business }: { business: ConfigurationBusiness }) => (

    <div>
        <h2 className="text-lg font-medium text-foreground">Síguenos</h2>
        <div className="mt-4 flex space-x-4">
            {business.business_facebook_url && <Links name="Facebook" value={business.business_facebook_url} icon={<CiFacebook className="h-6 w-6" />} />}
            {business.business_instagram_url && <Links name="Instagram" value={business.business_instagram_url} icon={<CiInstagram className="h-6 w-6" />} />}
            {business.business_x_url && <Links name="Twitter" value={business.business_x_url} icon={<FaXTwitter className="h-6 w-6" />} />}
        </div>
    </div>
);


export function FooterClientContent() {
    const { data, error } = useApiRequest(getBusiness);
    const business = data?.configuration;

    if (error) {
        return <div>Error loading business information</div>;
    }

    if (!business) {
        return <div>Loading business data...</div>;
    }

    console.log('business:', business);

    return (
        <>
            <ContactInfo business={business} />
            <SocialMedia business={business} />
        </>
    );
}
