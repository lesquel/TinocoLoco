import { Container } from "@/components/sections/layout/container";
import { Section } from "@/components/sections/layout/section";
import { ReviewForm } from "@/components/utils/coments/ReviewForm";
import { ReviewList } from "@/components/utils/coments/ReviewList";
import EventCard from "@/features/events/components/EventCard";
import { addReview, getReviews } from "@/features/events/services/events";

export default function Event({ params }: { params: { id: string } }) {
  const eventId = parseInt(params.id, 10);
  console.log("eventIdddddddddddddddd:", eventId);

  return (
    <Container>
      <Section>
        <EventCard id={eventId} />
      </Section>
      <div className="flex flex-col w-full gap-4 max-w-xl mx-auto">
        <Section>
          <ReviewForm eventId={eventId} />
        </Section>
        <Section>
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <ReviewList eventId={eventId} />
        </Section>
      </div>
    </Container>
  );
}
