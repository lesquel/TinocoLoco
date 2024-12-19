from django.db import models
from cloudinary.models import CloudinaryField

from base.abstracts import Product

class EventCategory(Product):

    event_category_name = models.CharField(max_length=100)
    event_category_description = models.CharField(max_length=500)
    event_category_image = CloudinaryField(null=True, blank=True)

    def __str__(self) -> str:
        return self.event_category_name
