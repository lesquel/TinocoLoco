import { Container } from "@/components/sections/layout/container";
import { Section } from "@/components/sections/layout/section";
import { CategoryDashboard } from "@/features/events/section/category/categotyDashboard";

export default function CategotyEvent() {
  return (
    <Container>
      <Section>
        <CategoryDashboard />
      </Section>
    </Container>
  );
}
