import { register } from "@/features/auth/services/auth";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: {
    home: {
      label: "Home",
      href: "/",
    },
    events: {
      label: "Eventos",
      href: "/events",
    },
    services: {
      label: "Servicios",
      href: "/services",
    },
    blog: {
      label: "Blog",
      href: "/blog",
    },
    about: {
      label: "About",
      href: "/about",
    },
  },
  navMenuItems: {
    account: {
      label: "Cuentas",
      href: "/accounts",
    },
    edit: {
      label: "Editar Cuenta",
      href: "/accounts/edit",
    },
    login: {
      label: "Login",
      href: "/accounts/login",
    },
    register: {
      label: "Register",
      href: "/accounts/register",
    },
    logout: {
      label: "Logout",
      href: "/accounts/logout",
    },
    dashboard: {
      label: "Dashboard",
      href: "/dashboard",
    },
  },
};

