import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import NoFountEvents from "@/public/images/no_fount_events.jpg"
import { IUEvent } from "@/interfaces/IUevents";
import Link from "next/link";
import { redirect } from "next/navigation";
export function CardEvents({event}: { event: IUEvent }) {
  return (
    <div className="h-52 w-52 ">

      <Card isFooterBlurred className="border-none" radius="lg">
        <Image
          alt="Woman listing to music"
          className="object-cover"
          height={208}
          src={event.photos[0] || NoFountEvents.src}
          width={208}
        />
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny text-white/80">{event.event_name}</p>
          <Button
            className="text-tiny text-white bg-black/20"
            color="default"
            radius="lg"
            size="sm"
            variant="flat"
            onPress={() => redirect(`/events/${event.id}`)}
          >
            Ver
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
