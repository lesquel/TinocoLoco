"use client";
import { TitleSection } from "@/components/utils/titleSection";
import { UserActiveGraphic } from "../components/graphics/user/userActive";
import { UserEmailVerificate } from "../components/graphics/user/userEmailVerificate";
import { UserSexGraphic } from "../components/graphics/user/userSex";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { ServiciosMostPopularGraphic } from "../components/graphics/services/serviciosMostPopular";
import { ServiceMostViewGraphic } from "../components/graphics/services/serviceMostView";

export default function HomeDashboard() {
  return (
    <div className="flex w-full flex-col m-9">
      <Tabs aria-label="Options">
        <Tab key="users" title="Users">
          <Card>
            <CardBody>
              <TitleSection title="Graficos" description="Usuarios" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <UserActiveGraphic />
                <UserEmailVerificate />
                <UserSexGraphic />
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Services" title="Services">
          <Card>
            <CardBody>
              <TitleSection title="Graficos" description="Servicios" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <ServiciosMostPopularGraphic />
                <ServiceMostViewGraphic />
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Events" title="Events">
          <Card>
            <CardBody></CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
