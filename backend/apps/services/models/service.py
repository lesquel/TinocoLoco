from django.db import models
from django.contrib.contenttypes.fields import GenericRelation

from base.abstracts import Product
from apps.reviews.models import Review
from apps.photos.models import Photo
from .service_category import ServiceCategory


class Service(Product):
    service_name = models.CharField(max_length=100)
    service_description = models.CharField(max_length=500)
    service_unitary_cost = models.FloatField()
    service_creation_date = models.DateField(auto_now_add=True)
    service_category = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE)

    reviews = GenericRelation(Review, related_query_name="services")
    photos = GenericRelation(Photo, related_query_name="services")

    def __str__(self):
        return self.service_name
