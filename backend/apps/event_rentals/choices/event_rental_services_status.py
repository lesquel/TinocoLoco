from django.db import models
from django.utils.translation import gettext_lazy as _


class EventRentalServiceStatus(models.TextChoices):
    PENDING = "PENDING", "Pendiente"
    DELIVERED = "DELIVERED", "Entregado"
    CANCELLED = "CANCELLED", "Cancelado"
    RETURNED = "RETURNED", "Devuelto"
    LOST = "LOST", "Perdido"
    DAMAGED = "DAMAGED", "Dañado"
    IN_USE = "IN_USE", "En uso"