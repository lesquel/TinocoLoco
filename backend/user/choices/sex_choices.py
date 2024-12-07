# from base.interfaces import EnumInterface
from django.utils.translation import gettext_lazy as _
from django.db import models


class SexChoices(models.TextChoices):
    MALE = "M",_("Masculino")
    FEMALE = "F",_("Femenino")
