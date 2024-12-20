from django.db import models
from django.contrib.contenttypes.fields import GenericRelation

from base.abstracts import Product
from apps.reviews.models import Review
from apps.photos.models import Photo
from .service_category import ServiceCategory
from ..messages.variable_names import VARIABLE_NAMES_SERVICE


class Service(Product):
    class Meta:
        verbose_name = VARIABLE_NAMES_SERVICE["META_VERBOSE_NAME"]
        verbose_name_plural = VARIABLE_NAMES_SERVICE["META_VERBOSE_NAME_PLURAL"]

    service_name = models.CharField(
        max_length=100,
        verbose_name=VARIABLE_NAMES_SERVICE["SERVICE_NAME"],
    )
    service_description = models.CharField(
        max_length=500,
        verbose_name=VARIABLE_NAMES_SERVICE["SERVICE_DESCRIPTION"],
    )
    service_unitary_cost = models.FloatField(
        verbose_name=VARIABLE_NAMES_SERVICE["SERVICE_UNITARY_COST"],
    )

    service_category = models.ForeignKey(
        ServiceCategory,
        on_delete=models.CASCADE,
        verbose_name=VARIABLE_NAMES_SERVICE["SERVICE_CATEGORY"],
    )

    reviews = GenericRelation(
        Review,
        related_query_name="services",
        verbose_name=VARIABLE_NAMES_SERVICE["REVIEWS"],
    )
    photos = GenericRelation(
        Photo,
        related_query_name="services",
        verbose_name=VARIABLE_NAMES_SERVICE["PHOTOS"],
    )

    def __str__(self):
        return self.service_name
