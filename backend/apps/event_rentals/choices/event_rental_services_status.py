from django.db import models
from django.utils.translation import gettext_lazy as _


class EventRentalServiceStatus(models.TextChoices):
    PENDING = "PENDING", _("Pendiente")
    DELIVERED = "DELIVERED", _("Entregado")
    CANCELLED = "CANCELLED", _("Cancelado")
    RETURNED = "RETURNED", _("Devuelto")
    LOST = "LOST", _("Perdido")
    DAMAGED = "DAMAGED", _("Dañado")
    IN_USE = "IN_USE", _("En uso")