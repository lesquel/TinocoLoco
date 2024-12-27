import { Container } from "@/components/sections/layout/container";
import { Section } from "@/components/sections/layout/section";
import ServicesCard from "@/features/services/components/ServicesCard";
import { SectionReview } from "@/features/services/section/services/reviews/secitonReview";

export default async function Event({ params }: { params: { id: string } }) {
    const { id } = await params; // Asegúrate de esperar la promesa
    const servicesId = parseInt(id, 10); // Convertir a número si es necesario

    return (
        <Container>
            <div className="flex max-w-6xl mx-auto">

            <Section>
                <ServicesCard id={servicesId} />
            </Section>
            </div>
            <SectionReview serviceId={servicesId} />
        </Container>
    );
}
