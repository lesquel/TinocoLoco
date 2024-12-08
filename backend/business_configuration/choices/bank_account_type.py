from django.db import models

class BankAccountType(models.TextChoices):
    SAVINGS = "SAV", "Ahorro"
    CURRENT = "CUR", "Corriente"