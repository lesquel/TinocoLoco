import { Container } from "@/components/sections/layout/container";
import { Section } from "@/components/sections/layout/section";
import { CreateFormCategory } from "@/features/services/section/categoty/createFormCategory";

export default function CreateCategoryEvent() {
  return <Container>
    <Section>
      <CreateFormCategory />
    </Section>
  </Container>;
}