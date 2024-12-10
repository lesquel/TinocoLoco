from django.db import models
from cloudinary.models import CloudinaryField
from django.utils.translation import gettext as _

EVENT_CATEGORY_IMAGE_VERBOSE = _("Imagen del tipo de evento")


class EventCategory(models.Model):
    
    event_category_name = models.CharField(max_length=100)
    event_category_description = models.CharField(max_length=500)
    event_category_image = CloudinaryField(EVENT_CATEGORY_IMAGE_VERBOSE, blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return self.event_category_name
