from django.db import models
from dirtyfields import DirtyFieldsMixin
from django.contrib.contenttypes.fields import GenericRelation

from base.utils import generate_confirmation_code
from apps.users.models.user import CustomUser
from apps.events.models import Event
from apps.reviews.models import Review
from apps.promotions.models import Promotion
from apps.photos.models import Photo
from ..choices import PaymentMethod
from ..messages import VARIABLE_NAMES_EVENT_RENTAL
from .rental_status_history import RentalStatusHistory


class EventRental(DirtyFieldsMixin, models.Model):
    class Meta:
        verbose_name = VARIABLE_NAMES_EVENT_RENTAL["META_VERBOSE_NAME"]
        verbose_name_plural = VARIABLE_NAMES_EVENT_RENTAL["META_VERBOSE_NAME_PLURAL"]

    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="event_rentals",
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL["EVENT"],
    )

    owner = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL["OWNER"],
    )
    event_rental_date = models.DateField(
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL["EVENT_RENTAL_DATE"]
    )
    event_rental_start_time = models.TimeField(
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL["EVENT_RENTAL_START_TIME"]
    )
    event_rental_planified_end_time = models.TimeField(
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL["EVENT_RENTAL_PLANIFIED_END_TIME"]
    )
    event_rental_end_time = models.TimeField(
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL["EVENT_RENTAL_END_TIME"]
    )
    event_rental_cost = models.FloatField(
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL["EVENT_RENTAL_COST"]
    )
    event_rental_cancelled_value_in_advance = models.FloatField(
        default=0,
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL[
            "EVENT_RENTAL_CANCELLED_VALUE_IN_ADVANCE"
        ],
    )
    event_rental_payment_method = models.CharField(
        max_length=50,
        choices=PaymentMethod.choices,
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL["EVENT_RENTAL_PAYMENT_METHOD"],
    )
    event_rental_observation = models.TextField(
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL["EVENT_RENTAL_OBSERVATION"],
    )
    event_rental_min_attendees = models.IntegerField(
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL["EVENT_RENTAL_MIN_ATTENDEES"]
    )
    event_rental_max_attendees = models.IntegerField(
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL["EVENT_RENTAL_MAX_ATTENDEES"]
    )
    event_rental_creation_date = models.DateTimeField(
        auto_now_add=True,
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL["EVENT_RENTAL_CREATION_DATE"],
    )

    promotions = models.ManyToManyField(
        Promotion,
        blank=True,
        related_name="event_rentals",
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL["PROMOTIONS"],
    )

    photos = GenericRelation(Photo, related_query_name="event_rentals")
    view_count = models.IntegerField(
        default=0, verbose_name=VARIABLE_NAMES_EVENT_RENTAL["VIEW_COUNT"]
    )

    owner_rating = models.OneToOneField(
        Review,
        related_name="owner_event_rental",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL["OWNER_RATING"],
    )

    costumer_rating = models.OneToOneField(
        Review,
        related_name="customer_event_rental",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL["COSTUMER_RATING"],
    )

    current_status = models.OneToOneField(
        RentalStatusHistory,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL["CURRENT_STATUS"],
    )

    confirmation_code = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL["CONFIRMATION_CODE"],
    )

    def increase_view_count(self):
        self.view_count += 1
        self.save()

    def change_status(self, status, user):
        new_status = RentalStatusHistory.objects.create(
            rental=self, status=status, changed_by=user
        )
        self.current_status = new_status
        self.save(update_fields=["current_status"])

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)
        if not self.confirmation_code:
            self.confirmation_code = generate_confirmation_code()
        if is_new:
            initial_status = RentalStatusHistory.objects.create(
                rental=self,
                status="Activo",
                changed_by=None,
            )
            self.current_status = initial_status

        super().save(update_fields=["current_status"])

    def __str__(self):
        return f"{self.event} - {self.event_rental_date}"
