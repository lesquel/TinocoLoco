from django.db import models
from cloudinary.models import CloudinaryField
from django.utils.translation import gettext as _
from base.abstracts import Product


from django.db import models
from cloudinary.models import CloudinaryField
from base.abstracts import Product

from ..messages import VARIABLE_NAMES_SERVICE_CATEGORY


class ServiceCategory(Product):
    class Meta:
        verbose_name = VARIABLE_NAMES_SERVICE_CATEGORY["META_VERBOSE_NAME"]
        verbose_name_plural = VARIABLE_NAMES_SERVICE_CATEGORY[
            "META_VERBOSE_NAME_PLURAL"
        ]

    service_category_name = models.CharField(
        max_length=100,
        verbose_name=VARIABLE_NAMES_SERVICE_CATEGORY["SERVICE_CATEGORY_NAME"],
    )
    service_category_description = models.CharField(
        max_length=500,
        verbose_name=VARIABLE_NAMES_SERVICE_CATEGORY["SERVICE_CATEGORY_DESCRIPTION"],
    )
    service_category_image = CloudinaryField(
        null=True,
        blank=True,
        verbose_name=VARIABLE_NAMES_SERVICE_CATEGORY["SERVICE_CATEGORY_IMAGE"],
    )

    def __str__(self):
        return self.service_category_name
