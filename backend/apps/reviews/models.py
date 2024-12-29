from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.utils.translation import gettext_lazy as _
from django.db.models import Avg
from django.db import models
from apps.users.models.user import CustomUser

from base.utils import errors
from .messages import ERROR_MESSAGES, VARIABLE_NAMES_REVIEW




class ReviewManager(models.Manager):
    def create(self, *args, **kwargs):
        owner = kwargs.get("owner")
        content_type = kwargs.get("content_type")
        object_id = kwargs.get("object_id")

        if self.filter(owner=owner, content_type=content_type, object_id=object_id).exists():
            raise errors.ValidationError(ERROR_MESSAGES["OWNER_CONTENT_TYPE_OBJECT_ID_EXISTS"])

        return super().create(*args, **kwargs)


class Review(models.Model):
    class Meta:
        verbose_name = VARIABLE_NAMES_REVIEW["META_VERBOSE_NAME"]
        verbose_name_plural = VARIABLE_NAMES_REVIEW["META_VERBOSE_NAME_PLURAL"]
        constraints = [
            models.UniqueConstraint(
                fields=["content_type", "object_id", "owner"],
                name="unique_review_per_owner",
            )
        ]

    owner = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        verbose_name=VARIABLE_NAMES_REVIEW["OWNER"],
    )

    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE,
        verbose_name=VARIABLE_NAMES_REVIEW["CONTENT_TYPE"],
    )
    object_id = models.PositiveIntegerField(
        verbose_name=VARIABLE_NAMES_REVIEW["OBJECT_ID"],
    )
    content_object = GenericForeignKey("content_type", "object_id")

    rating_score = models.PositiveIntegerField(
        choices=[(i, i) for i in range(0, 6)],
        verbose_name=VARIABLE_NAMES_REVIEW["RATING_SCORE"],
    )
    rating_comment = models.TextField(
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_REVIEW["RATING_COMMENT"],
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=VARIABLE_NAMES_REVIEW["CREATED_AT"],
    )

    objects = ReviewManager()

    @classmethod
    def avg_rating_for_object(cls, content_object):
        reviews = cls.objects.filter(content_object=content_object)
        avg_rating = reviews.aggregate(Avg('rating_score'))['rating_score__avg']
        return avg_rating if avg_rating is not None else 0.0

    @property
    def content_type_name(self):
        return self.content_type.model

    def __str__(self):
        return  f"{self.owner}: {self.content_object} - {self.rating_score}"
