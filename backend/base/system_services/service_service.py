from django.db.models import Count

from services.models import Service
from base.abstracts import AAnaliticService


class ServiceService(AAnaliticService):
    model = Service
    
    @classmethod
    def get_most_populars(self, params="event_rental_services"):
        return super().get_most_populars(params)