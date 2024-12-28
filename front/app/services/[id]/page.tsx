import { Container } from "@/components/sections/layout/container";
import { Section } from "@/components/sections/layout/section";
import ServicesCard from "@/features/services/components/ServicesCard";
import { SectionReview } from "@/features/services/section/services/reviews/secitonReview";

export default function Event({ params }: { params: { id: string } }) {
  const servicesId = parseInt(params.id, 10);

  return (
    <Container>
      <Section>
        <ServicesCard id={servicesId} />
      </Section>
      <SectionReview serviceId={servicesId} />
    </Container>
  );
}
