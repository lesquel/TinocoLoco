import { IUPromotion } from "@/interfaces/IUPromotions";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import NoFountPromotion from "@/public/images/no_fount_events.jpg";
export  function CardPromotions({
    promotion
}: {
    promotion: IUPromotion;
}) {
  return (
    <Card className="py-4 max-w-[208px] mx-auto">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{promotion.promotion_name}</p>
        <small className="text-default-500">{promotion.promotion_description}
            <br />
            Desde {promotion.valid_from} hasta {promotion.valid_until}
        </small>
        <h4 className="font-bold text-large">
            {promotion.promotion_discount_percentage}% de descuento
        </h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex justify-center items-center">
        <Image
          alt="Card background"
          className="object-cover rounded-xl mx-auto"
          src={promotion.promotion_image_url || NoFountPromotion.src}
          width={208}
          height={208}
        />
      </CardBody>
    </Card>
  );
}