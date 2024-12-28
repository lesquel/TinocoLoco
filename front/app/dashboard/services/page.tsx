import { Container } from "@/components/sections/layout/container";
import { Section } from "@/components/sections/layout/section";
import { AllEvents } from "@/features/events/section/events/allEvents";
import { AllServices } from "@/features/services/section/services/allServices";

export default function DashboardEvents() {
  return (
    <Container>
      <Section>
        <AllServices
          size={10}
          infoComponent={{ title: "Todos", description: "Los Eventos" }}
        />
      </Section>
    </Container>
  );
}
