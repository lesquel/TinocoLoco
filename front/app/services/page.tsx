import { Container } from "@/components/sections/layout/container";
import { Section } from "@/components/sections/layout/section";
import { AllServices } from "@/features/services/section/services/allServices";

export default function Events() {
  return (
    <>
      <Container>
        <Section>
          <AllServices
            size={5}
            infoComponent={{
              title: "Servicios",
              description: "Nuestros servicios",
            }}
          />
        </Section>
      </Container>
    </>
  );
}
