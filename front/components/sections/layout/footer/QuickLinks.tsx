import { Link } from "@nextui-org/react";

import { siteConfig } from "@/config/site";

export const QuickLinks = () => (
  <div>
    <h2 className="text-2xl font-bold text-foreground ">Enlaces rápidos</h2>
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
