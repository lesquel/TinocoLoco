"use client";
import { TitleSection } from "@/components/utils/titleSection";

import { Banner } from "@/components/sections/home/banner";
import { MostPopularEvents } from "@/features/events/section/events/mostPopular";
import { MostViewedEvents } from "@/features/events/section/events/mostViewed";
import { Section } from "@/components/sections/layout/section";
import { Container } from "@/components/sections/layout/container";
import { CategoryHome } from "@/features/events/section/category/categoryHome";
import { MostPopularServices } from "@/features/services/section/services/mostPopularService";
import { MostViewedSServices } from "@/features/services/section/services/mostViewedService";
import { getTokenFromCookie } from "@/features/auth/utils/getUserInfo";
import { CategoryHomeServices } from "@/features/services/section/categoty/categoryHome";
import { MostViewedPromotions } from "@/features/promotions/section/promotions/mostViewPromotions";
import { MostPopularPromotions } from "@/features/promotions/section/promotions/mostPopularPromotions";

export default function Home() {
  const user = getTokenFromCookie();

  console.log("user Homeeeeeee:", user);

  return (
    <>
      <Banner />
      <div className="flex max-w-6xl mx-auto">
        <Container>

          <div className="p-8 rounded-lg shadow-lg">
            <TitleSection
              description="nuestros eventos"
              title="Conoce más de"
            />
            <p className="text-lg text-white text-center mb-6">
              En nuestra empresa, nos especializamos en crear experiencias únicas a través de eventos bien organizados y de alta calidad. Ya sea que estés buscando un evento corporativo, una conferencia, una fiesta privada o una exposición, tenemos la solución perfecta para ti.
            </p>

          </div>


          <Section>
            <CategoryHome />
          </Section>

          <Section>
            <MostPopularEvents />
          </Section>

          <Section>
            <MostViewedEvents />
          </Section>



          <div className="p-8 rounded-lg shadow-lg">
            <TitleSection
              classnames="text-center"
              description="nuestros servicios"
              title="Conoce más de"
            />
            <p className="text-lg text-white text-center mb-6">
              Nos enorgullece ofrecer servicios excepcionales y personalizados para cada tipo de cliente. Ya sea que necesites servicios para un evento corporativo, una fiesta privada o soluciones para tu empresa, tenemos lo que necesitas. Descubre cómo podemos ayudarte a hacer realidad tus ideas.
            </p>
          </div>


          <Section>
            <CategoryHomeServices />
          </Section>

          <Section>
            <MostPopularServices />
          </Section>


          <Section>
            <MostViewedSServices />
          </Section>

          <Section>
            <MostViewedPromotions />
          </Section>
          <Section>
            <MostPopularPromotions />
          </Section>

        </Container>
      </div>
    </>
  );
}
