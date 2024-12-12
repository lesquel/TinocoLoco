from events.models import EventCategory
from .Iservice import IService

class EventCategoryService(IService):
    model = EventCategory
