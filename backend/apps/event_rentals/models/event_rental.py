from django.db import models
from django.contrib.contenttypes.fields import GenericRelation
from decimal import Decimal
import datetime

from base.utils import generate_confirmation_code
from base.utils import errors
from apps.users.models.user import CustomUser
from apps.events.models import Event
from apps.reviews.models import Review
from apps.promotions.models import Promotion
from apps.photos.models import Photo
from ..messages import VARIABLE_NAMES_EVENT_RENTAL
from .rental_status_history import RentalStatusHistory
from ..choices import PaymentMethod, EventRentalStatus


class EventRental(models.Model):
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
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL["EVENT_RENTAL_END_TIME"],
        blank=True,
        null=True,
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

    promotion = models.ForeignKey(
        Promotion,
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name="event_rentals",
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL["PROMOTIONS"],
    )
    photos = GenericRelation(Photo, related_query_name="event_rentals")
    view_count = models.IntegerField(
        default=0,
        verbose_name=VARIABLE_NAMES_EVENT_RENTAL["VIEW_COUNT"],
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

    @property
    def event_rental_cost(self):
        total = Decimal(self.event.event_reference_value) if self.event else Decimal(0)
        for service in self.event_rental_services.all():
            total += Decimal(service.price)
        if self.promotion:
            discount = Decimal(self.promotion.promotion_discount_percentage) / Decimal(
                100
            )
            total -= total * discount
        return total

    def increase_view_count(self):
        self.view_count += 1
        self.save(update_fields=["view_count"])

    def change_status(self, status, user):
        try:
            new_status = RentalStatusHistory.objects.create(
                rental=self, status=status, changed_by=user
            )
            self.current_status = new_status
            self.save(update_fields=["current_status"])
        except Exception as e:
            raise ValueError(f"Error changing status: {e}")

    def generate_confirmation_code(self):
        self.confirmation_code = generate_confirmation_code()
        self.save(update_fields=["confirmation_code"])
        
    def clean_event_rental_date(self):
        if self.event_rental_date < datetime.date.today():
            raise errors.EventRentalDateCannotBeLessThanTodayError()
        if self.event_rental_date < datetime.date.today() + datetime.timedelta(days=3):
            raise errors.EventRentalDateMustBeAtLeastThreeDaysInAdvanceError()
    
    
    
    def clean(self):
        if self.event_rental_min_attendees > self.event_rental_max_attendees:
            raise errors.InvalidMinAttendeesError()
        if self.event_rental_cancelled_value_in_advance < 0:
            raise errors.ValueCancellationInAdvanceMustBeGreaterThanZeroError()


    def save(self, *args, **kwargs):
        is_new = self.pk is None

        super().save(*args, **kwargs)
        if is_new:
            initial_status = RentalStatusHistory.objects.create(
                rental=self, status=EventRentalStatus.PENDING.value, changed_by=None
            )
            self.current_status = initial_status
        super().save(update_fields=["current_status"])

    def __str__(self):
        return f"{self.event} - {self.event_rental_date}"
