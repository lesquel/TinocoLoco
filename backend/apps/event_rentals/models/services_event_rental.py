from django.db import models
from apps.services.models import Service

from base.utils import errors

from ..choices import EventRentalServiceStatus
from ..messages import VARIABLE_NAMES_EVENT_RENTAL_SERVICES, ERROR_MESSAGES
from .event_rental import EventRental


class ServicesEventRental(models.Model):
    class Meta:
        verbose_name = VARIABLE_NAMES_EVENT_RENTAL_SERVICES["META_VERBOSE_NAME"]
        verbose_name_plural = VARIABLE_NAMES_EVENT_RENTAL_SERVICES[
            "META_VERBOSE_NAME_PLURAL"
        ]
        constraints = [
            models.UniqueConstraint(
                fields=["event_rental", "service"],
                name="unique_event_rental_service",
            )
        ]

    event_rental = models.ForeignKey(
        EventRental,
        on_delete=models.CASCADE,
        related_name="event_rental_services",
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL_SERVICES["EVENT_RENTAL"],
    )
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name="event_rental_services",
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL_SERVICES["SERVICE"],
    )
    service_quantity = models.IntegerField(
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL_SERVICES["SERVICE_QUANTITY"],
    )

    status = models.CharField(
        max_length=10,
        choices=EventRentalServiceStatus.choices,
        default=EventRentalServiceStatus.PENDING.value,
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL_SERVICES["STATUS"],
    )

    date_to_deliver = models.DateField(
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL_SERVICES["DATE_TO_DELIVER"],
    )
    description = models.TextField(
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL_SERVICES["DESCRIPTION"],
    )
    service_observation = models.TextField(
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL_SERVICES["SERVICE_OBSERVATION"],
    )

    def clean(self):
        if self.service_quantity < 1:
            raise errors.ValidationError(
                ERROR_MESSAGES["AMOUNT_MUST_BE_GREATER_THAN_ZERO"]
            )
        if self.date_to_deliver < self.event_rental.event_rental_date:
            raise errors.ValidationError(ERROR_MESSAGES["INVALID_DELIVERY_DATE"])
        if ServicesEventRental.objects.filter(
            event_rental=self.event_rental, service=self.service
        ).exists():
            raise errors.ValidationError(
                ERROR_MESSAGES["EVENT_RENTAL_ALREADY_HAS_SERVICE"]
            )

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    @property
    def price(self):
        return self.service.service_unitary_cost * self.service_quantity

    def __str__(self):
        return f"{self.event_rental} | {self.service}"
