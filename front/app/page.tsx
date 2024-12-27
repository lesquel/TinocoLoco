"use client";
import { Banner } from "@/components/sections/home/banner";
import { MostPopularEvents } from "@/features/events/section/events/mostPopular";
import { MostViewedEvents } from "@/features/events/section/events/mostViewed";
import { Section } from "@/components/sections/layout/section";
import { Container } from "@/components/sections/layout/container";
import { CategoryHome } from "@/features/events/section/category/categoryHome";
import { MostPopularServices } from "@/features/services/section/services/mostPopularService";
import { MostViewedSServices } from "@/features/services/section/services/mostViewedService";
import { getTokenFromCookie } from "@/features/auth/utils/getUserInfo";

export default function Home() {
  const user = getTokenFromCookie();
  console.log("user Homeeeeeee:", user);
  return (
    <>
      <Banner />
      <div className="flex max-w-6xl mx-auto">
        <Container>
          <Section>
            <CategoryHome />
          </Section>

          <Section>
            <MostPopularEvents />
          </Section>

          <Section>
            <MostViewedEvents />
          </Section>

          <Section>
            <MostPopularServices />
          </Section>

          <Section>
            <MostViewedSServices />
          </Section>
        </Container>
      </div>
    </>
  );
}
