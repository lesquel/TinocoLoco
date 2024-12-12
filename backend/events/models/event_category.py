from django.db import models
from cloudinary.models import CloudinaryField
from django.utils.translation import gettext as _



class EventCategory(models.Model):

    event_category_name = models.CharField(max_length=100)
    event_category_description = models.CharField(max_length=500)
    event_category_image = CloudinaryField(null=True, blank=True)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return self.event_category_name
