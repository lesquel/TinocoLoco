import { Container } from "@/components/sections/layout/container";
import { Section } from "@/components/sections/layout/section";
import { AllEvents } from "@/features/events/section/events/allEvents";

export default function Events() {
  return (
    <>
      <Container>
        <Section>
          <AllEvents
            infoComponent={{ title: "Todos", description: "Los Eventos" }}
            size={8}
          />
        </Section>
      </Container>
    </>
  );
}
