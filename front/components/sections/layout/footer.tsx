"use client";
import { LuPartyPopper } from "react-icons/lu";
import { Suspense } from "react";
import { Link, NavbarContent, Navbar } from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import { FooterClientContent } from "./FooterClientContent";

const QuickLinks = () => (
  <Navbar >
    <h2 className="text-lg font-medium text-foreground">Enlaces rápidos</h2>
    <NavbarContent className="mt-4 space-y-2 text-foreground-700">

      {Object.entries(siteConfig.navItems).map(([key, item]) => (
        <Link key={key} href={item.href} className="hover:underline">
          {item.label}
        </Link>
      ))}
    </NavbarContent>
  </Navbar>
);



export function Footer() {
  return (
    <footer className="bg-background-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-primary">
          <LuPartyPopper className="h-8 w-8" />
        </div>
        <p className="mt-4 text-center text-foreground-600">
          Nuestra misión es proveer soluciones que impacten positivamente a nuestros usuarios.
        </p>

        {/* Usando Tailwind para la grilla */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <QuickLinks />
          <Suspense fallback={<div>Loading contact info...</div>}>
            <FooterClientContent />
          </Suspense>
        </div>

        <div className="mt-16 border-t border-divider pt-8">
          <p className="text-center text-sm text-foreground-500">
            &copy; {new Date().getFullYear()} TuEmpresa. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
