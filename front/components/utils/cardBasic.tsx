import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { redirect } from "next/navigation";
import NofounService from "@/public/images/no_fount_events.jpg"
import { IUImg } from "@/interfaces/IUimg";
import Link from "next/link";
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
  const defaultImage =  NofounService.src;
  const imageSrc = (item[imageKey] as IUImg[])[0]?.image_url || defaultImage;
  const title = (item[titleKey] as string) || "Sin título";
  const id = item[idKey];

  return (
    <div className="h-52 w-52 mx-auto">
      <Card isFooterBlurred className="border-none" radius="lg">
        <Image
          alt={title}
          className="object-cover"
          height={208}
          src={imageSrc}
          width={208}
        />
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny text-white/80">{title}</p>
          <Link
            href={`${url}/${id}`}
            className="text-tiny text-white bg-black/20"
            color="default"
          >
            Ver
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
