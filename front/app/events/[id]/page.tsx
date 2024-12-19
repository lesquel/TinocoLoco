import { Container } from "@/components/sections/layout/container";
import { Section } from "@/components/sections/layout/section";
import EventCard from "@/features/events/components/EventCard";
import { MostPopularEvents } from "@/features/events/section/mostPopular";
import { MostViewedEvents } from "@/features/events/section/mostViewed";

export default async function Event({ params }: { params: { id: string } }) {
    const { id } = await params; // Asegúrate de esperar la promesa
    const eventId = parseInt(id, 10); // Convertir a número si es necesario

    return (
        <Container>
            <Section>
                <EventCard id={eventId} />
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
