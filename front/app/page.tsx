"use client";

import { Banner } from "@/components/sections/home/banner";
import { MostPopularEvents } from "@/features/events/section/mostPopular";
import { MostViewedEvents } from "@/features/events/section/mostViewed";
import { Section } from "@/components/sections/layout/section";
import { Container } from "@/components/sections/layout/container";
import { CategoryHome } from "@/features/events/section/categoryHome";
import { MostPopularServices } from "@/features/services/section/mostPopularService";
import { MostViewedSServices } from "@/features/services/section/mostViewedService";
export default function Home() {



  return (
    <>
      <Banner />
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
    </>
  );
}
