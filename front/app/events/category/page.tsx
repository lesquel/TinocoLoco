import { Container } from "@/components/sections/layout/container";
import { Section } from "@/components/sections/layout/section";
import { AllCategorysEvent } from "@/features/events/section/events/AllCategorysEvent";

export default async function CategotyEvent() {
  return (
    <Container>
      <Section>
        <AllCategorysEvent
          size={10}
          infoComponent={{ title: "Todos", description: "Categorias" }}
        />
      </Section>
    </Container>
  );
}
