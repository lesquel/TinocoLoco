"use client";
import { Banner } from "@/components/sections/home/banner";
import { MostPopularEvents } from "@/features/events/section/events/mostPopular";
import { MostViewedEvents } from "@/features/events/section/events/mostViewed";
import { Section } from "@/components/sections/layout/section";
import { Container } from "@/components/sections/layout/container";
import { CategoryHome } from "@/features/events/section/category/categoryHome";
import { MostPopularServices } from "@/features/services/section/mostPopularService";
import { MostViewedSServices } from "@/features/services/section/mostViewedService";
import Header from "@/components/sections/layout/header";

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
