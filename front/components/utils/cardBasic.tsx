import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";

import NofounService from "@/public/images/no_fount_events.jpg";
import { IUImg } from "@/interfaces/IUimg";

interface ReusableCardProps<T> {
  item: T;
  url: string;
  imageKey: keyof T; // Propiedad para la imagen
  titleKey: keyof T; // Propiedad para el título
  defaultImage: string; // Imagen por defecto
  idKey: keyof T; // Propiedad para el identificador
}

export function CardBasic<T>({
  item,
  url,
  imageKey,
  titleKey,
  idKey,
}: ReusableCardProps<T>) {
  const defaultImage = NofounService.src;
  const imageSrc = (item[imageKey] as IUImg[])[0]?.image_url || defaultImage;
  const title = (item[titleKey] as string) || "Sin título";
  const id = item[idKey];

  return (
    <div className="h-52 w-52 mx-auto hover:scale-105 transition-all">
      <Card as="div" className="border-none" radius="lg">
        <Link href={`${url}/${id}`}>
          <Image
            alt={title}
            className="object-cover"
            height={208}
            src={imageSrc}
            width={208}
          />
        </Link>
        <CardFooter className="backdrop-blur-lg  justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny text-white/80">{title}</p>
          {/* Remove Link here to avoid nested anchor tags */}
          <Button
            as={Link}
            className="text-tiny text-white bg-black/20"
            href={`${url}/${id}`}
          >
            Ver
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
