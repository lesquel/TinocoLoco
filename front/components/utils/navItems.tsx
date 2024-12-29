"use client";

import { NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemsProps {
  items: {
    [key: string]: {
      href: string;
      label: string;
    };
  };
}

export function NavItems({ items }: NavItemsProps) {
  const pathname = usePathname();

  return (
    <>
      {Object.entries(items).map(([key, item]) => (
        <NavbarItem key={key} isActive={pathname === item.href}>
          <Link
            aria-current={pathname === item.href ? "page" : undefined}
            className={`text-foreground hover:text-[#F43F5E] transition-colors ${
              pathname === item.href ? "font-semibold" : ""
            }`}
            href={item.href}
          >
            {item.label}
          </Link>
        </NavbarItem>
      ))}
    </>
  );
}
