from django.db import models
from django.utils.translation import gettext_lazy as _

class BankAccountType(models.TextChoices):
    SAVINGS = "SAV", _("Ahorros")
    CURRENT = "CUR", _("Corriente")