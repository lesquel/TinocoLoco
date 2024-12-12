from django.db import models
from django.utils.translation import gettext_lazy as _

class PaymentMethod(models.TextChoices):
    CASH = 'cash', _('Efectivo')
    CREDIT_CARD = 'credit_card', _('Tarjeta de crédito')
    DEBIT_CARD = 'debit_card', _('Tarjeta de débito')
    BANK_TRANSFER = 'bank_transfer', _('Transferencia bancaria')
    OTHER = 'other', _('Otro')