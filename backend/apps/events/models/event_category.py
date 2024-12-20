from django.db import models
from cloudinary.models import CloudinaryField

from base.abstracts import Product
from ..messages import VARIABLE_NAMES_EVENT_CATEGORY


class EventCategory(Product):
    class Meta:
        verbose_name = VARIABLE_NAMES_EVENT_CATEGORY["META_VERBOSE_NAME"]
        verbose_name_plural = VARIABLE_NAMES_EVENT_CATEGORY["META_VERBOSE_NAME_PLURAL"]

    event_category_name = models.CharField(
        max_length=100,
        verbose_name=VARIABLE_NAMES_EVENT_CATEGORY["EVENT_CATEGORY_NAME"],
    )
    event_category_description = models.CharField(
        max_length=500,
        verbose_name=VARIABLE_NAMES_EVENT_CATEGORY["EVENT_CATEGORY_DESCRIPTION"],
    )
    event_category_image = CloudinaryField(
        null=True,
        blank=True,
        verbose_name=VARIABLE_NAMES_EVENT_CATEGORY["EVENT_CATEGORY_IMAGE"],
    )

    def __str__(self) -> str:
        return self.event_category_name
