from django.db import models
from django.contrib.contenttypes.fields import GenericRelation

from ..messages import VARIABLE_NAMES_EVENT
from base.abstracts import Product
from apps.reviews.models import Review
from apps.photos.models import Photo
from .event_category import EventCategory


class Event(Product):
    class Meta:
        verbose_name = VARIABLE_NAMES_EVENT["META_VERBOSE_NAME"]
        verbose_name_plural = VARIABLE_NAMES_EVENT["META_VERBOSE_NAME_PLURAL"]

    event_name = models.CharField(
        max_length=100,
        verbose_name=VARIABLE_NAMES_EVENT["EVENT_NAME"],
    )
    event_description = models.CharField(
        max_length=500,
        verbose_name=VARIABLE_NAMES_EVENT["EVENT_DESCRIPTION"],
    )
    event_reference_value = models.DecimalField(
        decimal_places=2,
        verbose_name=VARIABLE_NAMES_EVENT["EVENT_REFERENCE_VALUE"],
    )
    event_allowed_hours = models.IntegerField(
        verbose_name=VARIABLE_NAMES_EVENT["EVENT_ALLOWED_HOURS"],
    )
    event_extra_hour_rate = models.DecimalField(
        decimal_places=2,
        verbose_name=VARIABLE_NAMES_EVENT["EVENT_EXTRA_HOUR_RATE"],
    )
    event_category = models.ForeignKey(
        EventCategory,
        on_delete=models.CASCADE,
        verbose_name=VARIABLE_NAMES_EVENT["EVENT_CATEGORY"],
    )

    reviews = GenericRelation(Review, related_query_name='events', verbose_name=VARIABLE_NAMES_EVENT["REVIEWS"])
    photos = GenericRelation(Photo, related_query_name='events',verbose_name=VARIABLE_NAMES_EVENT["PHOTOS"])

    def __str__(self):
        return self.event_name
