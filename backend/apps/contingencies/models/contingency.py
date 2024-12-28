# apps/contingencies/models.py
from django.db import models
from apps.event_rentals.models import EventRental
from ..choices import ContingencyImpactLevel, ContingencyCategory
from ..messages import VARIABLE_NAMES_CONTINGENCY
from datetime import datetime


class Contingency(models.Model):
    class Meta:
        verbose_name = VARIABLE_NAMES_CONTINGENCY["META_VERBOSE_NAME"]
        verbose_name_plural = VARIABLE_NAMES_CONTINGENCY["META_VERBOSE_NAME_PLURAL"]

    event_rental = models.ForeignKey(
        EventRental,
        related_name="contingencies",
        on_delete=models.CASCADE,
        verbose_name=VARIABLE_NAMES_CONTINGENCY["EVENT_RENTAL"],
    )
    contingency_description = models.TextField(
        verbose_name=VARIABLE_NAMES_CONTINGENCY["CONTINGENCY_DESCRIPTION"]
    )
    contingency_impact_level = models.CharField(
        max_length=50,
        choices=ContingencyImpactLevel.choices,
        verbose_name=VARIABLE_NAMES_CONTINGENCY["CONTINGENCY_IMPACT_LEVEL"],
    )
    contingency_category = models.CharField(
        max_length=50,
        choices=ContingencyCategory.choices,
        default=ContingencyCategory.OTHER.value,
        verbose_name=VARIABLE_NAMES_CONTINGENCY["CONTINGENCY_CATEGORY"],
    )
    contingency_penalty_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        verbose_name=VARIABLE_NAMES_CONTINGENCY["CONTINGENCY_PENALTY_AMOUNT"],
    )
    contingency_time_occurred = models.TimeField(
        verbose_name=VARIABLE_NAMES_CONTINGENCY["CONTINGENCY_TIME_OCCURRED"],
    )
    
    @property
    def contingency_date_occurred(self):
        event_date = self.event_rental.event_rental_date
        event_time = self.contingency_time_occurred
        return datetime.combine(event_date, event_time)

    def __str__(self):
        return f"Id. {self.event_rental}: {self.contingency_description}"
