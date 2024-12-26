"use client";

import {
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";
import { getTokenFromCookie } from "@/features/auth/utils/getUserInfo";
import { IUUser, Role } from "@/interfaces/IUser";

export const LinksRegister = () => {
  const [userInfo, setUserInfo] = useState<IUUser | null>(null);

  useEffect(() => {
    const token = getTokenFromCookie();
    setUserInfo(token);
  }, []);

  return (
    <NavbarContent justify="end">
      {!userInfo ? (
        <>
          <NavbarItem className="hidden lg:flex">
            <Link
              href={siteConfig.navMenuItems.login.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {siteConfig.navMenuItems.login.label}
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              href={siteConfig.navMenuItems.register.href}
              variant="flat"
            >
              {siteConfig.navMenuItems.register.label}
            </Button>
          </NavbarItem>
        </>
      ) : (
        <Dropdown placement="bottom-end">
          <NavbarItem>
            <DropdownTrigger>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar
                  isBordered
                  as="span"
                  className="transition-transform"
                  color="secondary"
                  name={userInfo?.user?.first_name}
                  size="sm"
                  src={userInfo?.user?.first_name}
                />
                <span>{userInfo?.user?.first_name ?? "Usuario"}</span>
              </div>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              key="profile"
              className="h-14 gap-2"
              textValue="Conectado como"
            >
              <p className="font-semibold">Conectado como</p>
              <p className="font-semibold">{userInfo?.user?.email}</p>
            </DropdownItem>
            <DropdownItem
              key="settings"
              href={siteConfig.navMenuItems.account.href}
              textValue="Account Settings"
            >
              {siteConfig.navMenuItems.account.label}
            </DropdownItem>
            {userInfo.user.role === Role.ADMIN ? (
              <DropdownItem
                key="dashboard"
                href={siteConfig.navMenuItems.dashboard.href}
                textValue="Admin Dashboard"
              >
                {siteConfig.navMenuItems.dashboard.label}
              </DropdownItem>
            ) : null}
            <DropdownItem
              key="logout"
              color="danger"
              href={siteConfig.navMenuItems.logout.href}
              textValue="Log Out"
            >
              {siteConfig.navMenuItems.logout.label}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </NavbarContent>
  );
};
