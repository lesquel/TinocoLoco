"use client";

import { CardInfoLoadin } from "@/components/utils/loagins/cardInfoLoading";
import { TitleSection } from "@/components/utils/titleSection";
import { getBusiness } from "@/features/business/services/businessServices";
import { useApiRequest } from "@/hooks/useApiRequest";
import { Card, CardBody, Button, Image } from "@nextui-org/react";
import { AboutSectionSkeleton } from "@/components/utils/loagins/about";
import No_fount_business from "@/public/images/no_fount_events.jpg";
import Miquel from "@/public/images/miquel.jpeg";
import Bryan from "@/public/images/bryan.jpeg";
import Jandry from "@/public/images/jandry.jpeg";
import Johan from "@/public/images/no_fount_events.jpg";

interface StaffCardProps {
  name: string;
  role: string;
  imageUrl: string;
}

function StaffCard({ name, role, imageUrl }: StaffCardProps) {
  return (
    <Card shadow="sm" isPressable onPress={() => console.log("card pressed")}>
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={name}
          className="w-full object-cover h-[140px] object-center"
          src={imageUrl}
        />
      </CardBody>
      <CardBody className="text-small justify-between">
        <b>{name}</b>
        <p className="text-default-500">{role}</p>
      </CardBody>
    </Card>
  );
}

export default function AboutSection() {
  const { data, error, isLoading } = useApiRequest(getBusiness);

  if (isLoading) {
    return <AboutSectionSkeleton />;
  }

  if (error) {
    return <div>Error al obtener la información de la empresa</div>;
  }

  const staffMembers = [
    {
      name: "Miquel",
      role: "Diseñador",
      imageUrl: Miquel.src,
    },
    {
      name: "Bryan",
      role: "Diseñador",
      imageUrl: Bryan.src,
    },
    {
      name: "Jandry",
      role: "Diseñador",
      imageUrl: Jandry.src,
    },
    {
      name: "Johan",
      role: "Desarrollador",
      imageUrl: Johan.src,
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <TitleSection description="Sobre nosotros" title="Sobre nosotros" />

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="w-full md:w-1/2">
          <Image
            alt="Sobre nosotros"
            src={data.business_logo_url || No_fount_business.src}
            width={400}
            height={400}
          />
        </div>
        <div className="w-full md:w-1/2">
          <Card>
            <CardBody>
              <h2 className="text-3xl font-bold mb-4">Sobre Nosotros</h2>
              <p className="mb-4">
                Fundado en 2010, nuestro centro de eventos se ha consolidado
                como un referente en la organización de experiencias
                inolvidables. Nos especializamos en brindar espacios versátiles
                y servicios personalizados que superan las expectativas de
                nuestros clientes.
              </p>
              <p className="mb-4">
                Nuestro enfoque se basa en tres pilares fundamentales:
              </p>
              <ul className="list-disc list-inside mb-4">
                <li>Innovación en cada detalle</li>
                <li>Atención centrada en el cliente</li>
                <li>Excelencia en la organización</li>
              </ul>
              <p className="mb-4">
                Con más de una década de experiencia, hemos albergado más de 500
                eventos exitosos, desde bodas íntimas y celebraciones familiares
                hasta grandes conferencias y eventos corporativos.
              </p>
              <div className="flex justify-between mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">10+</p>
                  <p className="text-sm">Años de experiencia</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">500+</p>
                  <p className="text-sm">Eventos realizados</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">50+</p>
                  <p className="text-sm">Profesionales a tu servicio</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <h2 className="text-3xl font-bold my-8 text-center">Nuestro Equipo</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {staffMembers.map((member, index) => (
          <StaffCard key={index} {...member} />
        ))}
      </div>
    </div>
  );
}
