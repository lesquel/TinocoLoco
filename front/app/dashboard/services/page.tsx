import { Container } from "@/components/sections/layout/container";
import { Section } from "@/components/sections/layout/section";
import { AllServices } from "@/features/services/section/services/allServices";

export default function DashboardEvents() {
  return (
    <Container>
      <Section>
        <AllServices
          infoComponent={{ title: "Todos", description: "Los Eventos" }}
          size={10}
        />
      </Section>
    </Container>
  );
}
