from django.db import models

from base.abstracts import Product


class PromotionCategory(Product):
    promotion_category_name = models.CharField(max_length=100)
    promotion_category_description = models.CharField(max_length=500)

    def __str__(self):
        return self.promotion_category_name
