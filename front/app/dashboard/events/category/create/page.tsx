import { Container } from "@/components/sections/layout/container";
import { Section } from "@/components/sections/layout/section";
import { CreateFormCategory } from "@/features/events/section/category/createFormCategoty";

export default function CreateCategoryEvent() {
  return (
    <Container>
      <Section>
        <CreateFormCategory />
      </Section>
    </Container>
  );
}
