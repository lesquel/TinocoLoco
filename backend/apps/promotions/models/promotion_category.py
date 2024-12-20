from django.db import models
from base.abstracts import Product

from ..messages import VARIABLE_NAMES_PROMOTION_CATEGORY

class PromotionCategory(Product):
    class Meta:
        verbose_name = VARIABLE_NAMES_PROMOTION_CATEGORY["META_VERBOSE_NAME"]
        verbose_name_plural = VARIABLE_NAMES_PROMOTION_CATEGORY["META_VERBOSE_NAME_PLURAL"]

    promotion_category_name = models.CharField(
        max_length=100,
        verbose_name=VARIABLE_NAMES_PROMOTION_CATEGORY["PROMOTION_CATEGORY_NAME"],
    )
    promotion_category_description = models.CharField(
        max_length=500,
        verbose_name=VARIABLE_NAMES_PROMOTION_CATEGORY["PROMOTION_CATEGORY_DESCRIPTION"],
    )

    def __str__(self):
        return self.promotion_category_name
