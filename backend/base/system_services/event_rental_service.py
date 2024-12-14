from event_rentals.models import EventRental
from ..abstracts.Aservice import AService

class EventRentalService(AService):
    model = EventRental
