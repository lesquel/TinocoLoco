import { Container } from "@/components/sections/layout/container";
import { Section } from "@/components/sections/layout/section";
import { AllPromotions } from "@/features/Promotions/section/promotions/AllPromotions";

export default function Promotions() {
  return (
    <Container>
      <Section>
        <AllPromotions
          size={10}
          infoComponent={{ title: "Todos", description: "Promociones" }}
        />
      </Section>
    </Container>
  );
}
