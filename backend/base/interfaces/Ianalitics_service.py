from django.db.models import Count
from .Iservice import IService

class IAnaliticService(IService):
    
    @classmethod
    def get_most_populars(cls):
        queryset = cls.get_all()
        return queryset.annotate(rental_count=Count("event_rentals")).order_by("-rental_count")

    