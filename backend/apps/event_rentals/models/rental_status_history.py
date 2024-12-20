from django.db import models
from apps.event_rentals.choices import EventRentalStatus
from apps.users.models.user import CustomUser
from ..messages import VARIABLE_NAMES_RENTAL_STATUS_HISTORY


class RentalStatusHistory(models.Model):
    class Meta:
        verbose_name = VARIABLE_NAMES_RENTAL_STATUS_HISTORY["META_VERBOSE_NAME"]
        verbose_name_plural = VARIABLE_NAMES_RENTAL_STATUS_HISTORY[
            "META_VERBOSE_NAME_PLURAL"
        ]

    rental = models.ForeignKey(
        "EventRental",
        related_name="rental",
        on_delete=models.CASCADE,
        verbose_name=VARIABLE_NAMES_RENTAL_STATUS_HISTORY["RENTAL"],
    )
    changed_by = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_RENTAL_STATUS_HISTORY["CHANGED_BY"],
    )
    status = models.CharField(
        max_length=50,
        choices=EventRentalStatus.choices,
        default=EventRentalStatus.PENDING.value,
        verbose_name=VARIABLE_NAMES_RENTAL_STATUS_HISTORY["STATUS"],
    )
    reason = models.TextField(
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_RENTAL_STATUS_HISTORY["REASON"],
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=VARIABLE_NAMES_RENTAL_STATUS_HISTORY["CREATED_AT"],
    )

    def __str__(self):
        return f"{self.rental} - {self.status}"
