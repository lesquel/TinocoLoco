from django.db import models
from django.utils.translation import gettext_lazy as _


class PromotionCategory(models.Model):
    promotion_category_name = models.CharField(max_length=100)
    promotion_category_description = models.CharField(max_length=500)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.promotion_category_name
