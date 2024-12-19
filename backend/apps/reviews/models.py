from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.utils.translation import gettext as _
from django.db import models
from apps.users.models.user import CustomUser

from base.utils import errors
from .messages import ERROR_MESSAGES
RATING_MESSAGE = _("{}: {} - {}")


class ReviewManager(models.Manager):
    def create(self, *args, **kwargs):
        owner = kwargs.get("owner")
        content_type = kwargs.get("content_type")
        object_id = kwargs.get("object_id")

        if self.filter(owner=owner, content_type=content_type, object_id=object_id).exists():
            raise errors.ValidationError(ERROR_MESSAGES["OWNER_CONTENT_TYPE_OBJECT_ID_EXISTS"])

        return super().create(*args, **kwargs)


class Review(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_id")

    rating_score = models.PositiveIntegerField(choices=[(i, i) for i in range(0, 6)])
    rating_comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = ReviewManager()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["content_type", "object_id", "owner"],
                name="unique_review_per_owner",
            )
        ]





    @property
    def content_type_name(self):
        return self.content_type.model

    def __str__(self):
        return RATING_MESSAGE.format(self.owner, self.rating_score, self.content_object)
