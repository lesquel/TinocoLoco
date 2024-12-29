import { Card, Image } from "@nextui-org/react";
import Link from "next/link";

import No_Found_Event from "@/public/images/no_fount_events.jpg";

// Define the reusable Card component props interface
interface ICardProps {
  imageUrl: string;
  altText: string;
  title: string;
  linkUrl: string;
  width?: number;
  height?: number;
  className?: string;
}

export function CategoryCardBasic({
  imageUrl,
  altText,
  title,
  linkUrl,
  width = 160,
  height = 160,
  className = "",
}: ICardProps) {
  return (
    <Link
      className={`flex flex-col items-center gap-2 min-w-40 hover:scale-105 transition-all ${className}`}
      href={linkUrl}
    >
      <Card
        isPressable
        className="w-40 h-40 rounded-full overflow-hidden bg-[#f5f5f5]"
      >
        <div className="w-full h-full">
          <Image
            alt={altText}
            className="w-full h-full object-cover"
            height={height}
            src={imageUrl || No_Found_Event.src}
            width={width}
          />
        </div>
      </Card>
      <span className="text-sm font-medium text-default-700">{title}</span>
    </Link>
  );
}
