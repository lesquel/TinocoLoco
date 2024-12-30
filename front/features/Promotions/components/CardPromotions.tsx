"use client";
import { IUPromotion } from "@/interfaces/IUPromotions";
import { Card, CardHeader, CardBody, Image, Link } from "@nextui-org/react";
import NoFountPromotion from "@/public/images/no_fount_events.jpg";

export function CardPromotions({
  promotion,
}: {
  promotion: IUPromotion;
}) {
  return (
    <Link href={'/promotions'} >
      <Card
        className="py-4 max-w-[208px] mx-auto rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out"
      >
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start space-y-2">
          <p className="text-lg uppercase font-semibold ">{promotion.promotion_name}</p>
          <small className="text-sm text-default-500">
            {promotion.promotion_description} <br />
            <br />
          </small>
          {promotion.promotion_discount_percentage !== 0 && (
            <h4 className="font-semibold text-xs text-accent-600">
              {promotion.promotion_discount_percentage}% de descuento
            </h4>
          )}

        </CardHeader>
        <CardBody className="overflow-visible py-2 flex justify-center items-center">
          <Image
            alt="Card background"
            className="object-cover rounded-lg mx-auto shadow-md"
            src={promotion.promotion_image_url || NoFountPromotion.src}
            width={208}
            height={208}
          />
 <small className="text-xs text-default-500 block">
      Desde el {new Date(promotion.valid_from).toLocaleDateString("es-ES", { 
        day: "numeric", 
        month: "long", 
        year: "numeric" 
      })}
    </small>
    <small className="text-xs text-default-500 block">
      Hasta el {new Date(promotion.valid_until).toLocaleDateString("es-ES", { 
        day: "numeric", 
        month: "long", 
        year: "numeric" 
      })}
    </small>
        </CardBody>
      </Card>
    </Link>
  );
}
