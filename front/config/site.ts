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
  navItemsHeader: {
  
    blog: {
      label: "Promociones",
      href: "/promotions",
    },
    about: {
      label: "About",
      href: "/about",
    },
  },
  navMenuItems: {
    rentals: {
      label: "Rentals",
      href: "/rentals",
      add: {
        href: "/rentals/add",
      },
      myRentals: {
        href: "/rentals",
      },
    },
    myRentals: {
      label: "Mis reservas",
      href: "/rentals",
    },
    account: {
      label: "Cuentas",
      href: "/accounts",
    },
    edit: {
      label: "Editar Cuenta",
      href: "/accounts/edit",
    },
    login: {
      label: "Iniciar sesion",
      href: "/accounts/login",
    },
    register: {
      label: "Crear cuenta",
      href: "/accounts/register",
    },
    logout: {
      label: "Cerrar sesion",
      href: "/accounts/logout",
    },
    dashboard: {
      label: "Dashboard",
      href: "/dashboard",
    },
  },
};
