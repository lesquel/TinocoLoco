import { Container } from "@/components/sections/layout/container";
import { Section } from "@/components/sections/layout/section";
import { MostPopularEvents } from "@/features/events/section/events/mostPopular";
import { MostViewedEvents } from "@/features/events/section/events/mostViewed";
import ServicesCard from "@/features/services/components/ServicesCard";

export default async function Event({ params }: { params: { id: string } }) {
    const { id } = await params; // Asegúrate de esperar la promesa
    const eventId = parseInt(id, 10); // Convertir a número si es necesario

    return (
        <Container>
            <Section>
                <ServicesCard id={eventId} />
            </Section>

            <Section>
                <MostPopularEvents />
            </Section>

            <Section>
                <MostViewedEvents />
            </Section>
        </Container>
    );
}
