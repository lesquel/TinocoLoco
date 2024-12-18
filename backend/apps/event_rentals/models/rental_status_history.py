from django.db import models
from django.utils.translation import gettext_lazy as _
from apps.event_rentals.choices import EventRentalStatus
from apps.users.models.user import CustomUser


STATE_CHANGES = _("Estado de alquiler de {} cambiado a {} por {} el {}")


class RentalStatusHistory(models.Model):
    rental = models.ForeignKey(
        "EventRental", related_name="rental", on_delete=models.CASCADE
    )
    changed_by = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, blank=True, null=True
    )
    status = models.CharField(
        max_length=50,
        choices=EventRentalStatus.choices,
        default=EventRentalStatus.PENDING.value,
    )
    reason = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return STATE_CHANGES.format(
            self.rental, self.status.lower(), self.changed_by, self.created_at
        )
