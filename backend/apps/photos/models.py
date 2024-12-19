from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.utils.translation import gettext as _
from cloudinary.models import CloudinaryField
from base.utils import errors


PHOTO_STR = _("Foto de {}")

from .messages import ERROR_MESSAGES



class PhotoManager(models.Manager):
    @property
    def allowed_models(self):
        from services.models import Service
        from events.models import Event
        from event_rentals.models import EventRental

        return [EventRental, Service, Event]

    def validate_content_type(self, content_type, object_id):


        if not content_type or not object_id:
            raise errors.ValidationError(ERROR_MESSAGES["REQUIRED_FIELDS_ERROR"])

        try:
            model_class = content_type.model_class()
            if model_class not in self.allowed_models:
                raise errors.ValidationError(
                    ERROR_MESSAGES["PHOTO_ASSOCIATION_ERROR"].format(model_class.__name__)
                )
        except ContentType.DoesNotExist:
            raise errors.ValidationError(ERROR_MESSAGES["INVALID_CONTENT_TYPE"])

    def create(self, *args, **kwargs):
        content_type = kwargs.get("content_type")
        object_id = kwargs.get("object_id")

        self.validate_content_type(content_type, object_id)
        return super().create(*args, **kwargs)


class Photo(models.Model):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_id")
    image = CloudinaryField()

    objects = PhotoManager()


    @property
    def content_type_name(self):
        return self.content_type.model
    def clean(self):

        self.__class__.objects.validate_content_type(self.content_type, self.object_id)

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return PHOTO_STR.format(self.content_object)
