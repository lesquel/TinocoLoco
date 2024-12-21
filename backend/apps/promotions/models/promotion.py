from django.db import models
from cloudinary.models import CloudinaryField
from django.contrib.contenttypes.fields import GenericRelation

from base.abstracts import Product

from apps.reviews.models import Review

from ..messages import VARIABLE_NAMES_PROMOTION
from .promotion_category import PromotionCategory


class Promotion(Product):
    class Meta:
        verbose_name = VARIABLE_NAMES_PROMOTION["META_VERBOSE_NAME"]
        verbose_name_plural = VARIABLE_NAMES_PROMOTION["META_VERBOSE_NAME_PLURAL"]

    promotion_name = models.CharField(
        max_length=100,
        verbose_name=VARIABLE_NAMES_PROMOTION["PROMOTION_NAME"],
    )
    promotion_description = models.TextField(
        verbose_name=VARIABLE_NAMES_PROMOTION["PROMOTION_DESCRIPTION"],
    )
    promotion_category = models.ForeignKey(
        PromotionCategory,
        on_delete=models.CASCADE,
        verbose_name=VARIABLE_NAMES_PROMOTION["PROMOTION_CATEGORY"],
    )
    promotion_discount_percentage = models.FloatField(
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_PROMOTION["PROMOTION_DISCOUNT_PERCENTAGE"],
    )
    valid_from = models.DateField(
        verbose_name=VARIABLE_NAMES_PROMOTION["VALID_FROM"],
    )
    valid_until = models.DateField(
        verbose_name=VARIABLE_NAMES_PROMOTION["VALID_UNTIL"],
    )
    promotion_image = CloudinaryField(
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_PROMOTION["PROMOTION_IMAGE"],
    )

    reviews = GenericRelation(
        Review,
        related_query_name="promotions",
        verbose_name=VARIABLE_NAMES_PROMOTION["REVIEWS"],
    )

    def __str__(self):
        return self.promotion_name
