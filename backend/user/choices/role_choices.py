from django.db import models

from django.utils.translation import gettext_lazy as _

class RoleChoices(models.TextChoices):
    BUSINESS_OWNER = "business_onwer",_("Dueño de Negocio")
    CLIENT = "client",_("Cliente")