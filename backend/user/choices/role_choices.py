from django.db import models

from django.utils.translation import gettext_lazy as _

class RoleChoices(models.TextChoices):
    ADMIN = "admin",_("Administrador")
    COSTUMER = "costumer",_("Cliente")