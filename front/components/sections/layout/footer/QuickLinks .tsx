"use client";
import { Link, Navbar, NavbarContent } from "@nextui-org/react";
import { siteConfig } from "@/config/site";

export const QuickLinks = () => (
  <div>
    <h2 className="text-lg font-medium text-foreground">Enlaces rápidos</h2>
    <Navbar as="footer" role="banner">
      <NavbarContent className="mt-4 space-y-2 text-foreground-700 flex justify-center">
        {Object.entries(siteConfig.navItems).map(([key, item]) => (
          <Link key={key} href={item.href} className="hover:underline">
            {item.label}
          </Link>
        ))}
      </NavbarContent>
    </Navbar>
  </div>
);