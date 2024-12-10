from django.db import models
from django.utils.translation import gettext as _
from cloudinary.models import CloudinaryField

SERVICE_CATEGORY_IMAGE_VERBOSE = _("Imagen del tipo de servicio")


class ServiceCategory(models.Model):
    service_category_name = models.CharField(max_length=100)
    service_category_description = models.CharField(max_length=500)
    service_category_image = CloudinaryField(SERVICE_CATEGORY_IMAGE_VERBOSE,blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.service_category_name