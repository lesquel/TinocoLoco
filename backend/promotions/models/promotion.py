from django.db import models
from cloudinary.models import CloudinaryField
from .promotion_category import PromotionCategory

class Promotion(models.Model):
    promotion_name = models.CharField(max_length=100)
    promotion_description = models.TextField()
    promotion_category = models.ForeignKey(PromotionCategory, on_delete=models.CASCADE)
    promotion_discount_percentage = models.FloatField()
    valid_from = models.DateField()
    valid_until = models.DateField()
    promotion_image = CloudinaryField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    promotion_last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.promotion_name