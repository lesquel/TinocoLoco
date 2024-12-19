import { IUCategory } from "@/interfaces/IUevents";
import { Card, Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import No_Found_Event from "@/public/images/no_fount_events.jpg";
import Link from "next/link";

export function CategoryCard({ category }: { category: IUCategory }) {
    return (
        <Link href={`/events/category/${category.id}`}
            className="flex flex-col items-center gap-2 min-w-40 hover:scale-105 transition-all"
        >
            <Card
                isPressable
                className="w-40 h-40 rounded-full overflow-hidden bg-[#f5f5f5]"
            >
                <div className="w-full h-full">
                    <Image
                        width={160}
                        height={160}
                        src={category.event_category_image_url || No_Found_Event.src}
                        alt={category.event_category_image}
                        className="w-full h-full object-cover"
                    />
                </div>
            </Card>
            <span className="text-sm font-medium text-default-700">
                {category.event_category_name}
            </span>
        </Link>
    )
}

