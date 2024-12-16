from django.db import models

# Create your models here.
from event_rentals.models import EventRental

from ..choices import ContingencyImpactLevel, ContingencyCategory


class Contingency(models.Model):
    event_rental = models.ForeignKey(EventRental, on_delete=models.CASCADE)
    contingency_description = models.TextField()
    contingency_impact_level = models.CharField(
        max_length=50, choices=ContingencyImpactLevel.choices
    )
    contingency_category = models.CharField(
        max_length=50,
        choices=ContingencyCategory.choices,
        default=ContingencyCategory.OTHER.value,
    )

    contingency_penalty_amount = models.DecimalField(max_digits=10, decimal_places=2)
    contingency_date_occurred = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Contingencia ocurrida en el evento {self.event_rental.id} en {self.contingency_date_occurred}"
