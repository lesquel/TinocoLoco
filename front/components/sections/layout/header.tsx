"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getBusiness } from "@/features/business/services/businessServices";
import { useApiRequest } from "@/hooks/useApiRequest";
import { LinksRegister } from "@/features/auth/components/linksRegister";

export const AcmeLogo = ({ logo }: { logo: string }) => {
  return (
    <h2 color="foreground">{logo}</h2>
  );
};

export function Header() {
  const { data, error } = useApiRequest(getBusiness);

  if (error) {
    return <div>Error al obtener la información de la empresa</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const configuration = data?.configuration;

  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <AcmeLogo logo={configuration?.business_name ?? ""} />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href={siteConfig.navItems.home.href}>
            {siteConfig.navItems.home.label}
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href={siteConfig.navItems.events.href}>
            {siteConfig.navItems.events.label}
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href={siteConfig.navItems.services.href}>
            {siteConfig.navItems.services.label}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href={siteConfig.navItems.blog.href}>
            {siteConfig.navItems.blog.label}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <LinksRegister />
    </Navbar>
  );
}

