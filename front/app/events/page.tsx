import { Container } from "@/components/sections/layout/container";
import { Section } from "@/components/sections/layout/section";
import { AllEvents } from "@/features/events/section/allEvents";

export default function Events() {
    return (
        <>
            <Container>
                <Section>
                    <AllEvents />
                </Section>
            </Container>
        </>
    )
}