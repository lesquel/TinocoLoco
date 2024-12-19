from django.db import models
from django.contrib.contenttypes.fields import GenericRelation

from base.abstracts import Product

from apps.reviews.models import Review
from apps.photos.models import Photo
from .event_category import EventCategory


class Event(Product):
    event_name = models.CharField(max_length=100)
    event_description = models.CharField(max_length=500)
    event_reference_value = models.DecimalField(max_digits=10, decimal_places=2)
    event_allowed_hours = models.IntegerField()
    event_extra_hour_rate = models.DecimalField(max_digits=10, decimal_places=2)
    event_category = models.ForeignKey(EventCategory, on_delete=models.CASCADE)

    
    reviews = GenericRelation(Review, related_query_name='events')
    photos = GenericRelation(Photo, related_query_name='events')

    def __str__(self):
        return self.event_name
