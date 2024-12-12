"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Button } from "@nextui-org/react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getBusiness } from "@/features/business/services/businessServices";
import { useApiRequest } from "@/hooks/useApiRequest";
import Cookies from "js-cookie"; 
import { getTokenFromCookie } from "@/features/auth/utils/getToken";

export const AcmeLogo = ({ logo }: { logo: string }) => {
  return (
    <h2 color="foreground">{logo}</h2>
  );
};

export function Header() {
  const { data, error } = useApiRequest(getBusiness);
  const authToken = getTokenFromCookie(); // Obtiene el token de las cookies

  if (error) {
    return <div>Error al obtener la información de la empresa</div>;
  }
  if (!data) {
    return <div>No se ha obtenido la información de la empresa</div>;
  }

  const configuration = data?.configuration;

  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <AcmeLogo logo={configuration.business_name} />
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
        <NavbarItem>
          <Link color="foreground" href={siteConfig.navItems.blog.href}>
            {siteConfig.navItems.blog.label}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {!authToken ? (  // Verifica si no hay token (usuario no registrado)
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href={siteConfig.navMenuItems.login.href}>
                {siteConfig.navMenuItems.login.label}
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href={siteConfig.navMenuItems.register.href} variant="flat">
                {siteConfig.navMenuItems.register.label}
              </Button>
            </NavbarItem>
          </>
        ) : (  // Si hay token (usuario registrado)
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">zoey@example.com</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                <DropdownItem key="logout" color="danger" href={siteConfig.navMenuItems.logout.href}>
                  {siteConfig.navMenuItems.logout.label}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
