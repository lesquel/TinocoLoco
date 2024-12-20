from django.db import models
from .messages import VARIABLE_NAMES_PRODUCT


class Product(models.Model):
    view_count = models.IntegerField(
        default=0,
        verbose_name=VARIABLE_NAMES_PRODUCT['VIEW_COUNT']
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name=VARIABLE_NAMES_PRODUCT['IS_ACTIVE']
    )
    creation_date = models.DateField(
        auto_now_add=True,
        verbose_name=VARIABLE_NAMES_PRODUCT['CREATION_DATE']
    )
    last_actualization_date = models.DateField(
        auto_now=True,
        verbose_name=VARIABLE_NAMES_PRODUCT['LAST_ACTUALIZATION_DATE']
    )

    class Meta:
        abstract = True

    def increase_view_count(self):
        self.view_count += 1
        self.save()
