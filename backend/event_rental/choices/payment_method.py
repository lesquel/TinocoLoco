from django.db import models
from django.utils.translation import gettext_lazy as _

class PaymentMethod(models.TextChoices):
    CASH = 'CASH', _('Efectivo')
    CREDIT_CARD = 'CREDIT_CARD', _('Tarjeta de crédito')
    DEBIT_CARD = 'DEBIT_CARD', _('Tarjeta de débito')
    BANK_TRANSFER = 'BANK_TRANSFER', _('Transferencia bancaria')
    OTHER = 'OTHER', _('Otro')