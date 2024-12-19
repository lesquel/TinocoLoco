from django.db.models import Count
from .Aservice import AService

class AAnaliticService(AService):
    
    @classmethod
    def get_most_populars(cls, params="event_rentals"):
        queryset = cls.get_all()
        return queryset.annotate(rental_count=Count(params)).order_by("-rental_count")

    @classmethod
    def get_most_viewed(cls):
        queryset = cls.get_all()
        return queryset.order_by("-view_count")