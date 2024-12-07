from django.db import models
from django.db.models import F
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from cloudinary.models import CloudinaryField



class Picture(models.Model):

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_id")


    image = CloudinaryField(blank=True, null=True)
    



    def __str__(self) -> str:
        return f"Picture of {self.content_object}"
