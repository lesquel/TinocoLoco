from events.models import EventCategory
from ..abstracts.Aservice import AService

class EventCategoryService(AService):
    model = EventCategory
