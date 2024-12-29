"use client";

import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";

import { siteConfig } from "@/config/site";
import { LinksRegister } from "@/features/auth/components/linksRegister";
import { Logo } from "@/components/utils/logo";
import { NavItems } from "@/components/utils/navItems";

export default function Header() {
  return (
    <Navbar as="header" className="mx-auto w-full" role="banner">
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavItems items={siteConfig.navItems} />
      </NavbarContent>
      <LinksRegister />
    </Navbar>
  );
}
