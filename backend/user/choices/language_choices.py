from django.db import models
from django.utils.translation import gettext_lazy as _

class LanguageChoices(models.TextChoices):
    ENGLISH = "en",_("Inglés")
    SPANISH = "es",_("Español")