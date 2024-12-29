from django.db.models import Avg, FloatField
from django.db.models.functions import Coalesce
from .Aservice import AService

class AAnaliticService(AService):
    @classmethod
    def get_most_populars(cls):
        queryset = cls.get_all()
        return queryset.annotate(
            avg_rating=Coalesce(Avg("reviews__rating_score", output_field=FloatField()), 0.0)
        ).order_by("-avg_rating")


    @classmethod
    def get_most_viewed(cls):
        queryset = cls.get_all()
        return queryset.order_by("-view_count")