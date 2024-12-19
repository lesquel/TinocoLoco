from django.db import models
from ..choices import EventRentalServiceStatus
from .event_rental import EventRental
from apps.services.models import Service

class ServicesEventRental(models.Model):
    eventrental = models.ForeignKey(
        EventRental, on_delete=models.CASCADE, related_name="event_rental_services"
    )
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name="event_rental_services",
    )
    service_quantity = models.IntegerField()

    status = models.CharField(
        max_length=10,
        choices=EventRentalServiceStatus.choices,
        default=EventRentalServiceStatus.PENDING.value,
    )

    date_to_deliver = models.DateField()
    description = models.TextField(blank=True, null=True)
    service_observation = models.TextField(blank=True, null=True)
    
    
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["eventrental", "service"], name="unique_event_rental_service"
            )
        ]
