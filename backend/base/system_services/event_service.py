from django.db.models import Count
from events.models import Event
from base.abstracts import AAnaliticService


class EventService(AAnaliticService):

    model = Event
