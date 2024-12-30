import { Container } from "@/components/sections/layout/container";
import { Section } from "@/components/sections/layout/section";
import { AllCategorysServices } from "@/features/services/section/services/AllCategorysServices";

export default function CategoryServices() {
  return (
    <Container>
      <Section>
        <AllCategorysServices
          size={10}
          infoComponent={{ title: "Todos", description: "Categorias" }}
        />
      </Section>
    </Container>
  );
}
