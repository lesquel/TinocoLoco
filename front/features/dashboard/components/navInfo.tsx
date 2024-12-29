"use client";
import { Tabs, Tab } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

interface NavInfoProps {
  urls: {
    url: string;
    label: string;
  }[];
}

export const NavInfo = ({ urls }: NavInfoProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleTabChange = (path: string) => {
    router.push(path);
  };

  return (
    <div className="w-full flex justify-center">
      <Tabs
        aria-label="Navigation"
        classNames={{
          tabList: "bg-zinc-900 p-0.5",
          tab: "text-zinc-400 data-[selected=true]:text-white",
          cursor: "bg-blue-600",
          panel: "pt-2",
        }}
        radius="full"
        selectedKey={pathname}
        variant="solid"
        onSelectionChange={(key) => handleTabChange(key as string)}
      >
        {urls.map((url) => (
          <Tab key={url.url} title={url.label} />
        ))}
      </Tabs>
    </div>
  );
};
