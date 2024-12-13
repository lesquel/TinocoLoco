from events.models import EventCategory
from ..interfaces.Iservice import IService

class EventCategoryService(IService):
    model = EventCategory
