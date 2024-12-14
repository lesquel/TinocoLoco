from django.db.models import Count
from .Aservice import AService

class AAnaliticService(AService):
    
    @classmethod
    def get_most_populars(cls):
        queryset = cls.get_all()
        return queryset.annotate(rental_count=Count("event_rentals")).order_by("-rental_count")

    @classmethod
    def get_most_viewed(cls):
        queryset = cls.get_all()
        return queryset.order_by("-visualizations")