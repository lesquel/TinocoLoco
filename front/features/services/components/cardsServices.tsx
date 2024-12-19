import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import NoFountEvents from "@/public/images/no_fount_events.jpg"
import { redirect } from "next/navigation";
import { IUService } from "@/interfaces/IUservices";
export function CardServices({service}: { service: IUService }) {
  return (
    <div className="h-52 w-52 ">

      <Card isFooterBlurred className="border-none" radius="lg">
        <Image
          alt="Woman listing to music"
          className="object-cover"
          height={208}
          src={service.photos[0] || NoFountEvents.src}
          width={208}
        />
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny text-white/80">{service.service_name}</p>
          <Button
            className="text-tiny text-white bg-black/20"
            color="default"
            radius="lg"
            size="sm"
            variant="flat"
            onPress={() => redirect(`/services/${service.id}`)}
          >
            Ver
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
