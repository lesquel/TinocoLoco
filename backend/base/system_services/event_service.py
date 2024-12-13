from django.db.models import Count
from events.models import Event
from base.interfaces import IAnaliticService


class EventService(IAnaliticService):

    model = Event
