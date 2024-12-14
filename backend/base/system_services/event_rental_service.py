from event_rentals.models import EventRental
from ..abstracts.Aservice import AService


class EventRentalService(AService):
    model = EventRental

    @classmethod
    def get_most_viewed(cls):
        queryset = cls.get_all()
        return queryset.order_by("-visualizations")
    
    @classmethod
    def change_status(cls, event_rental, status, user):
        event_rental.change_status(status, user)
        return event_rental