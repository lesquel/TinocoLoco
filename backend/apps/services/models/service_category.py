from django.db import models
from cloudinary.models import CloudinaryField
from django.utils.translation import gettext as _
from base.abstracts import Product

class ServiceCategory(Product):
    service_category_name = models.CharField(max_length=100)
    service_category_description = models.CharField(max_length=500)
    service_category_image = CloudinaryField(null=True, blank=True)

    def __str__(self):
        return self.service_category_name
