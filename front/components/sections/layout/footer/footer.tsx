"use client";
import { QueryClientProvider } from "react-query";
import { FooterClientContent } from "./FooterClientContent";
import { QuickLinks } from "./QuickLinks";

export function Footer() {
  return (
    <footer className="bg-background-100 min-h-[300px]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Grilla con espacio para crecer */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 min-h-[200px]">
          <QuickLinks />
          <FooterClientContent />
        </div>
      </div>
    </footer>
  );
}
