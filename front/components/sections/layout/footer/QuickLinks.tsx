import { Link } from "@nextui-org/react";

import { siteConfig } from "@/config/site";

export const QuickLinks = () => (
  <div className="flex flex-col gap-4 items-center">
    <h2 className="text-lg font-medium text-foreground">Enlaces rápidos</h2>
    <div className="mt-4 space-y-2 text-foreground-700 flex justify-center flex-col">
      {Object.entries(siteConfig.navItems).map(([key, item]) => (
        <div key={key}>
          <Link className="group flex items-center space-x-2 text-white hover:text-[#F43F5E]"  href={item.href}>
            {item.label}
          </Link>
        </div>
      ))}
    </div>
  </div>
);
