from django.db import models
from cloudinary.models import CloudinaryField
from django.core.exceptions import ValidationError

from base.utils import errors

from .messages import VARIABLE_NAMES_BUSINESS_CONFIGURATION
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

    class Meta:
        verbose_name = VARIABLE_NAMES_BUSINESS_CONFIGURATION["META_VERBOSE_NAME"]
        verbose_name_plural = VARIABLE_NAMES_BUSINESS_CONFIGURATION[
            "META_VERBOSE_NAME_PLURAL"
        ]

    business_name = models.CharField(
        max_length=50,
        default="Tinocoloco",
        verbose_name=VARIABLE_NAMES_BUSINESS_CONFIGURATION["BUSINESS_NAME"],
    )

    business_logo = CloudinaryField(
        null=True,
        blank=True,
        verbose_name=VARIABLE_NAMES_BUSINESS_CONFIGURATION["BUSINESS_LOGO"],
    )

    business_address = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_BUSINESS_CONFIGURATION["BUSINESS_ADDRESS"],
    )

    business_phone_number = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_BUSINESS_CONFIGURATION["BUSINESS_PHONE_NUMBER"],
    )

    business_email = models.EmailField(
        default="tinocoloco265@gmail.com",
        verbose_name=VARIABLE_NAMES_BUSINESS_CONFIGURATION["BUSINESS_EMAIL"],
    )

    business_website_url = models.URLField(
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_BUSINESS_CONFIGURATION["BUSINESS_WEBSITE_URL"],
    )

    business_facebook_url = models.URLField(
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_BUSINESS_CONFIGURATION["BUSINESS_FACEBOOK_URL"],
    )

    business_instagram_url = models.URLField(
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_BUSINESS_CONFIGURATION["BUSINESS_INSTAGRAM_URL"],
    )

    business_x_url = models.URLField(
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_BUSINESS_CONFIGURATION["BUSINESS_X_URL"],
    )

    business_bank_account_number_1 = models.CharField(
        max_length=15,
        default="000000000000000",
        verbose_name=VARIABLE_NAMES_BUSINESS_CONFIGURATION[
            "BUSINESS_BANK_ACCOUNT_NUMBER_1"
        ],
    )

    business_bank_name_1 = models.CharField(
        max_length=40,
        default="Banco Genérico",
        verbose_name=VARIABLE_NAMES_BUSINESS_CONFIGURATION["BUSINESS_BANK_NAME_1"],
    )

    business_bank_account_type_1 = models.CharField(
        max_length=15,
        choices=BankAccountType.choices,
        default=BankAccountType.SAVINGS.value,
        verbose_name=VARIABLE_NAMES_BUSINESS_CONFIGURATION[
            "BUSINESS_BANK_ACCOUNT_TYPE_1"
        ],
    )

    business_bank_account_number_2 = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_BUSINESS_CONFIGURATION[
            "BUSINESS_BANK_ACCOUNT_NUMBER_2"
        ],
    )

    business_bank_name_2 = models.CharField(
        max_length=40,
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_BUSINESS_CONFIGURATION["BUSINESS_BANK_NAME_2"],
    )

    business_bank_account_type_2 = models.CharField(
        max_length=15,
        choices=BankAccountType.choices,
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_BUSINESS_CONFIGURATION[
            "BUSINESS_BANK_ACCOUNT_TYPE_2"
        ],
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
