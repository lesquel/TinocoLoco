import { NavbarContent, NavbarItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Button } from "@nextui-org/react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getTokenFromCookie } from "@/features/auth/utils/getUserInfo";

export const LinksRegister = () => {
    const userInfo = getTokenFromCookie();

    return (
        <NavbarContent justify="end">
            {!userInfo ? (  // Verifica si no hay token (usuario no registrado)
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
                            <span>{userInfo?.user?.first_name ?? "User"}</span>
                        </DropdownTrigger>

                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">{userInfo?.user?.email}</p>
                            </DropdownItem>
                            <DropdownItem key="settings" href={siteConfig.navMenuItems.account.href}>
                                {siteConfig.navMenuItems.account.label}
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger" href={siteConfig.navMenuItems.logout.href}>
                                {siteConfig.navMenuItems.logout.label}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarItem>
            )}
        </NavbarContent>
    )
}
