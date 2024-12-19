from django.db import models
from django.utils.translation import gettext_lazy as _
class ContingencyCategory(models.TextChoices):
    CANCELLATION = 'Cancellation', _('Cancelacion')
    DAMAGE = 'Damage', _('Daño')
    DELAY = 'Delay', _('Retraso')
    EQUIPMENT_FAILURE = 'Equipment Failure', _('Falla de Equipo')
    FORCE_MAJEURE = 'Force Majuere', _('Fuerza Mayor')
    INSURANCE = 'Insurance', _('Seguro')
    OTHER = 'Other', _('Otro')