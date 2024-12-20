from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from cloudinary.models import CloudinaryField

from base.utils import errors
from .messages import ERROR_MESSAGES, VARIABLE_NAMES_PHOTO



class PhotoManager(models.Manager):
    @property
    def allowed_models(self):
        from apps.services.models import Service
        from apps.events.models import Event
        from apps.event_rentals.models import EventRental

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
    class Meta:
        verbose_name = VARIABLE_NAMES_PHOTO["META_VERBOSE_NAME"]
        verbose_name_plural = VARIABLE_NAMES_PHOTO["META_VERBOSE_NAME_PLURAL"]

    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE,
        verbose_name=VARIABLE_NAMES_PHOTO["CONTENT_TYPE"],
    )
    object_id = models.PositiveIntegerField(
        verbose_name=VARIABLE_NAMES_PHOTO["OBJECT_ID"],
    )
    content_object = GenericForeignKey("content_type", "object_id")
    image = CloudinaryField(
        verbose_name=VARIABLE_NAMES_PHOTO["IMAGE"],
    )

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
        return self.image.url
