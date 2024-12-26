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
      label: "Events",
      href: "/events",
    },
    services: {
      label: "Services",
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
      label: "Account",
      href: "/accounts",
    },
    login: {
      label: "Login",
      href: "accounts/login",
    },
    register: {
      label: "Register",
      href: "accounts/register",
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

