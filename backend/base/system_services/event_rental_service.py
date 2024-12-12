from event_rentals.models import EventRental
from .Iservice import IService

class EventRentalService(IService):
    model = EventRental
