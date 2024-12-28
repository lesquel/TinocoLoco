import { Container } from "@/components/sections/layout/container";
import { Section } from "@/components/sections/layout/section";
import { CreateForm } from "@/features/events/section/events/createForm";

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
