import { Container } from "@/components/sections/layout/container";
import { Section } from "@/components/sections/layout/section";
import { AllServices } from "@/features/services/section/allServices";

export default function Events() {
    return (
        <>
            <Container>
                <Section>
                    <AllServices />
                </Section>
            </Container>
        </>
    )
}