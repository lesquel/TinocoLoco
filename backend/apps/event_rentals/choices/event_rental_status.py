from django.db import models
from django.utils.translation import gettext_lazy as _


class EventRentalStatus(models.TextChoices):
    PENDING = "pending", _("Pendiente")
    CONFIRMED = "confirmed", _("Confirmado")
    CANCELED = "canceled", _("Cancelado")
    COMPLETED = "completed", _("Completado")
    IN_PROGRESS = "in_progress", _("En progreso")
    ON_HOLD = "on_hold", _("En espera")
    