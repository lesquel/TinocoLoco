# models.py
from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _
from cloudinary.models import CloudinaryField


# Definir constantes para los nombres de los campos
BUSINESS_NAME_VERBOSE = _("Nombre del negocio")
BUSINESS_ADDRESS_VERBOSE = _("Direccion del negocio")
BUSINESS_PHONE_NUMBER_VERBOSE = _("Número de teléfono del negocio")
BUSINESS_EMAIL_VERBOSE = _("Correo electrónico del negocio")
BUSINESS_WEBSITE_URL_VERBOSE = _("URL del sitio web del negocio")
BUSINESS_FACEBOOK_URL_VERBOSE = _("URL de Facebook del negocio")
BUSINESS_INSTAGRAM_URL_VERBOSE = _("URL de Instagram del negocio")
BUSINESS_X_URL_VERBOSE = _("URL de X (anteriormente Twitter) del negocio")

BUSINESS_BANK_ACCOUNT_NUMBER_1_VERBOSE = _("Número de cuenta bancaria 1 del negocio")
BUSINESS_BANK_NAME_1_VERBOSE = _("Nombre del banco 1 del negocio")
BUSINESS_BANK_ACCOUNT_TYPE_1_VERBOSE = _("Tipo de cuenta bancaria 1 del negocio")

BUSINESS_BANK_ACCOUNT_NUMBER_2_VERBOSE = _("Número de cuenta bancaria 2 del negocio")
BUSINESS_BANK_NAME_2_VERBOSE = _("Nombre del banco 2 del negocio")
BUSINESS_BANK_ACCOUNT_TYPE_2_VERBOSE = _("Tipo de cuenta bancaria 2 del negocio")

META_VERBOSE_NAME = _("Configuracion del negocio")
META_VERBOSE_NAME_PLURAL = _("Configuraciones del negocio")


# Definir constantes para los nombres de los campos
BUSINESS_NAME_VERBOSE = _("Nombre del negocio")
BUSINESS_LOGO_VERBOSE = _("Logo del negocio")


BUSINESS_ADDRESS_VERBOSE = _("Direccion del negocio")
BUSINESS_PHONE_NUMBER_VERBOSE = _("Número de teléfono del negocio")
BUSINESS_EMAIL_VERBOSE = _("Correo electrónico del negocio")
BUSINESS_WEBSITE_URL_VERBOSE = _("URL del sitio web del negocio")
BUSINESS_FACEBOOK_URL_VERBOSE = _("URL de Facebook del negocio")
BUSINESS_INSTAGRAM_URL_VERBOSE = _("URL de Instagram del negocio")
BUSINESS_X_URL_VERBOSE = _("URL de X (anteriormente Twitter) del negocio")

BUSINESS_BANK_ACCOUNT_NUMBER_1_VERBOSE = _("Número de cuenta bancaria 1 del negocio")
BUSINESS_BANK_NAME_1_VERBOSE = _("Nombre del banco 1 del negocio")
BUSINESS_BANK_ACCOUNT_TYPE_1_VERBOSE = _("Tipo de cuenta bancaria 1 del negocio")

BUSINESS_BANK_ACCOUNT_NUMBER_2_VERBOSE = _("Número de cuenta bancaria 2 del negocio")
BUSINESS_BANK_NAME_2_VERBOSE = _("Nombre del banco 2 del negocio")
BUSINESS_BANK_ACCOUNT_TYPE_2_VERBOSE = _("Tipo de cuenta bancaria 2 del negocio")

META_VERBOSE_NAME = _("Configuracion del negocio")
META_VERBOSE_NAME_PLURAL = _("Configuraciones del negocio")

ONLY_ONE_CONFIGURATION_ERROR = _("Solo puede haber una configuración de negocio.")


ACCOUNT_TYPE_SAVINGS = _("Ahorro")
ACCOUNT_TYPE_CURRENT = _("Corriente")


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
        verbose_name = META_VERBOSE_NAME
        verbose_name_plural = META_VERBOSE_NAME_PLURAL

    ACCOUNT_TYPE_CHOICES = [
        ("saving", ACCOUNT_TYPE_SAVINGS),
        ("current", ACCOUNT_TYPE_CURRENT),
    ]

    business_name = models.CharField(
        max_length=50, verbose_name=BUSINESS_NAME_VERBOSE, default="Tinocoloco"
    )

    business_logo = CloudinaryField(
        BUSINESS_LOGO_VERBOSE,
        null=True,
        blank=True,
    )

    business_address = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name=BUSINESS_ADDRESS_VERBOSE,
    )
    business_phone_number = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        verbose_name=BUSINESS_PHONE_NUMBER_VERBOSE,
    )
    business_email = models.EmailField(
        verbose_name=BUSINESS_EMAIL_VERBOSE, default="tinocoloco265@gmail.com"
    )
    business_website_url = models.URLField(
        blank=True, null=True, verbose_name=BUSINESS_WEBSITE_URL_VERBOSE
    )
    business_facebook_url = models.URLField(
        blank=True,
        null=True,
        verbose_name=BUSINESS_FACEBOOK_URL_VERBOSE,
    )
    business_instagram_url = models.URLField(
        blank=True,
        null=True,
        verbose_name=BUSINESS_INSTAGRAM_URL_VERBOSE,
    )
    business_x_url = models.URLField(
        blank=True, null=True, verbose_name=BUSINESS_X_URL_VERBOSE
    )
    business_bank_account_number_1 = models.CharField(
        max_length=15,
        verbose_name=BUSINESS_BANK_ACCOUNT_NUMBER_1_VERBOSE,
        default="000000000000000",
    )
    business_bank_name_1 = models.CharField(
        max_length=40,
        verbose_name=BUSINESS_BANK_NAME_1_VERBOSE,
        default="Banco Genérico",
    )
    business_bank_account_type_1 = models.CharField(
        max_length=15,
        choices=ACCOUNT_TYPE_CHOICES,
        verbose_name=BUSINESS_BANK_ACCOUNT_TYPE_1_VERBOSE,
        default="saving",
    )
    business_bank_account_number_2 = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        verbose_name=BUSINESS_BANK_ACCOUNT_NUMBER_2_VERBOSE,
    )
    business_bank_name_2 = models.CharField(
        max_length=40,
        blank=True,
        null=True,
        verbose_name=BUSINESS_BANK_NAME_2_VERBOSE,
    )
    business_bank_account_type_2 = models.CharField(
        max_length=15,
        choices=ACCOUNT_TYPE_CHOICES,
        blank=True,
        null=True,
        verbose_name=BUSINESS_BANK_ACCOUNT_TYPE_2_VERBOSE,
    )

    objects = BusinessConfigurationManager()

    def clean(self):
        if BusinessConfiguration.objects.exists() and not self.pk:
            raise ValidationError(ONLY_ONE_CONFIGURATION_ERROR)

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.business_name
