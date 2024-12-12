from django.db import models


class PromotionCategory(models.Model):
    promotion_category_name = models.CharField(max_length=100)
    promotion_category_description = models.CharField(max_length=500)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.promotion_category_name
