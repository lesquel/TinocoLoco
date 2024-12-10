from django.db import models
from event_rentals.choices import EventRentalStatus
from .event_rental import EventRental
from users.models import CustomUser
from django.utils.translation import gettext as _


class RentalStatusHistory(models.Model):
    rental = models.ForeignKey(
        EventRental, related_name="rental", on_delete=models.CASCADE
    )
    changed_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=50,
        choices=EventRentalStatus.choices,
        default=EventRentalStatus.IN_PROGRESS,
    )
    changed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return _("Estado de alquiler de {} cambiado a {} por {} el {}").format(
            self.status, self.rental, self.changed_by, self.changed_at
        )
