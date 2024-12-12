from django.db import models
from django.utils.translation import gettext_lazy as _

class ContingencyImpactLevel(models.TextChoices):
    LOW = 'low', _('Bajo')
    MEDIUM = 'medium', _('Medio')
    HIGH = 'high', _('Alto')
    CRITICAL = 'critical', _('Crítico')
    EXTREME = 'extreme', _('Extremo')
    
