import { Container } from "@/components/sections/layout/container";
import { Section } from "@/components/sections/layout/section";
import { CreateForm } from "@/features/services/section/services/createForm";
const EventPage = () => {
  return (
    <Container>
      <Section>
        <CreateForm />
      </Section>
    </Container>
  );
};

export default EventPage;
