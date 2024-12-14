# models.py
from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _
from cloudinary.models import CloudinaryField

from base.utils import errors
from .choices import BankAccountType


class BusinessConfigurationManager(models.Manager):
    def create(self, *args, **kwargs):
        return super().create(*args, **kwargs)

    def get_or_create_unique(self, **kwargs):
        try:
            if self.model.objects.exists():
                return self.model.objects.first(), False
            return self.create(**kwargs), True
        except ValidationError as e:
            return None, False


class BusinessConfiguration(models.Model):

    business_name = models.CharField(max_length=50, default="Tinocoloco")

    business_logo = CloudinaryField(
        null=True,
        blank=True,
    )

    business_address = models.CharField(
        max_length=255,
        blank=True,
        null=True,
    )
    business_phone_number = models.CharField(
        max_length=15,
        blank=True,
        null=True,
    )
    business_email = models.EmailField(default="tinocoloco265@gmail.com")
    business_website_url = models.URLField(blank=True, null=True)
    business_facebook_url = models.URLField(
        blank=True,
        null=True,
    )
    business_instagram_url = models.URLField(
        blank=True,
        null=True,
    )
    business_x_url = models.URLField(blank=True, null=True)
    business_bank_account_number_1 = models.CharField(
        max_length=15,
        default="000000000000000",
    )
    business_bank_name_1 = models.CharField(
        max_length=40,
        default="Banco Genérico",
    )
    business_bank_account_type_1 = models.CharField(
        max_length=15,
        choices=BankAccountType.choices,
        default=BankAccountType.SAVINGS,
    )
    business_bank_account_number_2 = models.CharField(
        max_length=15,
        blank=True,
        null=True,
    )
    business_bank_name_2 = models.CharField(
        max_length=40,
        blank=True,
        null=True,
    )
    business_bank_account_type_2 = models.CharField(
        max_length=15,
        choices=BankAccountType.choices,
        blank=True,
        null=True,
    )

    objects = BusinessConfigurationManager()

    def clean(self):
        if BusinessConfiguration.objects.exists() and not self.pk:
            raise errors.ConfigurationAlreadyExistsError()

    def save(self, *args, **kwargs):
        if not self.pk and BusinessConfiguration.objects.exists():
            raise errors.ConfigurationAlreadyExistsError()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.business_name
