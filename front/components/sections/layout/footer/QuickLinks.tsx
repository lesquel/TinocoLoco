import { Link } from "@nextui-org/react";
import { siteConfig } from "@/config/site";

export const QuickLinks = () => (
  <div>
    aaaaaaa
    <h2 className="text-lg font-medium text-foreground">Enlaces rápidos</h2>
    <div className="mt-4 space-y-2 text-foreground-700 flex justify-center flex-col">
      {Object.entries(siteConfig.navItems).map(([key, item]) => (
        <div key={key}>
          <Link href={item.href} className="hover:underline">
            {item.label}
          </Link>
        </div>
      ))}
    </div>
  </div>
);
