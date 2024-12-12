from events.models import Event
from .Iservice import IService


class EventService(IService):

    model = Event
