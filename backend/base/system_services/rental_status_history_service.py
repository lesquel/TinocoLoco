from apps.event_rentals.models import RentalStatusHistory
from ..abstracts.Aservice import AService


class RentalStatusHistoryService(AService):
    model = RentalStatusHistory
