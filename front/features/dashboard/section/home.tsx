"use client";
import { TitleSection } from "@/components/utils/titleSection";
import { UserActiveGraphic } from "../components/graphics/user/userActive";
import { UserEmailVerificate } from "../components/graphics/user/userEmailVerificate";
import { UserSexGraphic } from "../components/graphics/user/userSex";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { ServiciosMostPopularGraphic } from "../components/graphics/services/serviciosMostPopular";
import { ServiceMostViewGraphic } from "../components/graphics/services/serviceMostView";
import { EventsMostPopularGraphic } from "../components/graphics/events/eventMostPopular";
import { EventsMostViewGraphic } from "../components/graphics/events/eventMostView";
import { EventsMostRantingGraphic } from "../components/graphics/events/eventMostRanting";
import { ServiceMostRantingGraphic } from "../components/graphics/services/serviceMostRanting";
import { UserRentalsDistribution } from "../components/graphics/user/UserRentalsDistribution";
import { UserMostRentalsGraphic } from "../components/graphics/user/UserMostRentals";

export default function HomeDashboard() {
  return (
    <div className="flex w-full flex-col m-9 max-w-6xl mx-auto">
      <Tabs aria-label="Options">
        <Tab key="users" title="Usuarios">
          <Card>
            <CardBody>
              <TitleSection title="Graficos" description="Usuarios" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <UserActiveGraphic />
                <UserEmailVerificate />
                <UserSexGraphic />
                <UserRentalsDistribution />
                <UserMostRentalsGraphic />
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Services" title="Servicios">
          <Card>
            <CardBody>
              <TitleSection title="Graficos" description="Servicios" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <ServiciosMostPopularGraphic />
                <ServiceMostViewGraphic />
                <ServiceMostRantingGraphic />
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Events" title="Eventos">
          <Card>
            <CardBody>

            <CardBody>
              <TitleSection title="Graficos" description="Eventos" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <EventsMostPopularGraphic />
                <EventsMostViewGraphic />
                <EventsMostRantingGraphic />
              </div>
            </CardBody>

            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
