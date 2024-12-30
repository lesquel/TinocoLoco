"use client";

import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdCheck, MdExpandMore } from "react-icons/md";

import { siteConfig } from "@/config/site";
import { getTokenFromCookie } from "@/features/auth/utils/getUserInfo";
import { IUUser, Role } from "@/interfaces/IUser";
import { Logo } from "@/components/utils/logo";
import User from "@/public/images/user.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<IUUser | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const user = getTokenFromCookie();
    setUserInfo(user);
  }, []);

  const navItems = Object.entries(siteConfig.navItemsHeader);

  const events = [
    { key: "events", label: "Eventos", href: "/events" },
    { key: "categories", label: "Categorias", href: "/events/category" },
  ];
  const services = [
    { key: "services", label: "Servicios", href: "/services" },
    { key: "categories", label: "Categorias", href: "/services/category" },
  ];

  return (
    <Navbar
      as="header"
      maxWidth="xl"
      className="bg-background/70 backdrop-blur-md"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link href="/">
            <Logo />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
        
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<MdExpandMore className="text-small" />}
                radius="sm"
                variant="light"
              >
                Eventos
              </Button>
            </DropdownTrigger>
          </NavbarItem>

          <DropdownMenu aria-label="Eventos" variant="flat">
            {events.map((item) => (
              <DropdownItem key={item.key} href={item.href}>
                {item.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

       
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<MdExpandMore className="text-small" />}
                radius="sm"
                variant="light"
              >
                Servicios
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu aria-label="Servicios" variant="flat">
            {services.map((item) => (
              <DropdownItem key={item.key} href={item.href}>
                {item.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        {navItems.map(([key, item]) => (
          <NavbarItem key={key} isActive={pathname === item.href}>
            <Link
              className={`text-foreground hover:text-[#F43F5E] transition-colors ${
                pathname === item.href ? "font-semibold" : ""
              }`}
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>


      <NavbarContent justify="end">
        {!userInfo ? (
          <>
            <NavbarItem className="hidden sm:flex">
              <Button
                as={Link}
                color="danger"
                href={siteConfig.navMenuItems.login.href}
                variant="flat"
              >
                {siteConfig.navMenuItems.login.label}
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="danger"
                href={siteConfig.navMenuItems.register.href}
                variant="solid"
              >
                {siteConfig.navMenuItems.register.label}
              </Button>
            </NavbarItem>
          </>
        ) : (
          <Dropdown placement="bottom-end">
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  variant="light"
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                >
                  <Avatar
                    isBordered
                    as="span"
                    className="transition-transform"
                    color="secondary"
                    name={userInfo?.user?.first_name}
                    size="sm"
                    src={User.src}
                  />
                  <span className="ml-2 hidden sm:inline-block">
                    {userInfo?.user?.username ?? "Usuario"}
                  </span>
                </Button>
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
              >
                {siteConfig.navMenuItems.account.label}
              </DropdownItem>
              {userInfo.user.role === Role.ADMIN && (
                <DropdownItem
                  key="dashboard"
                  href={siteConfig.navMenuItems.dashboard.href}
                >
                  {siteConfig.navMenuItems.dashboard.label}
                </DropdownItem>
              )}
              {userInfo.user && userInfo.user.role !== Role.ADMIN && (
                <DropdownItem
                  key="myRentals"
                  href={siteConfig.navMenuItems.myRentals.href}
                >
                  {siteConfig.navMenuItems.myRentals.label}
                </DropdownItem>
              )}
              <DropdownItem
                key="logout"
                color="danger"
                href={siteConfig.navMenuItems.logout.href}
              >
                {siteConfig.navMenuItems.logout.label}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>

      <NavbarMenu>
        {navItems.map(([key, item]) => (
          <NavbarMenuItem key={key}>
            <Link
              className={`w-full text-foreground hover:text-primary transition-colors ${
                pathname === item.href ? "font-semibold" : ""
              }`}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}

        
        {events.map((item) => (
          <NavbarMenuItem key={item.key}>
            <Link
              className="w-full text-foreground hover:text-primary transition-colors"
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        {services.map((item) => (
          <NavbarMenuItem key={item.key}>
            <Link
              className="w-full text-foreground hover:text-primary transition-colors"
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
