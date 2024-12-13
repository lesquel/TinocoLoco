from event_rentals.models import EventRental
from ..interfaces.Iservice import IService

class EventRentalService(IService):
    model = EventRental
