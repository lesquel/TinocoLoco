from django.db import models
from dirtyfields import DirtyFieldsMixin
from django.contrib.contenttypes.fields import GenericRelation

from base.utils import generate_confirmation_code
from apps.users.models.user import CustomUser
from apps.events.models import Event
from apps.reviews.models import Review
from apps.promotions.models import Promotion
from apps.photos.models import Photo
from base.utils import errors
from ..choices import PaymentMethod, EventRentalStatus
from .rental_status_history import RentalStatusHistory


class EventRental(DirtyFieldsMixin, models.Model):
    class Meta:
        verbose_name = "Event Rental"
        verbose_name_plural = "Event Rentals"

    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="event_rentals",
        verbose_name="Event",
    )
    owner = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        verbose_name="Owner",
    )
    event_rental_date = models.DateField(verbose_name="Rental Date")
    event_rental_start_time = models.TimeField(verbose_name="Start Time")
    event_rental_planified_end_time = models.TimeField(verbose_name="Planned End Time")
    event_rental_end_time = models.TimeField(verbose_name="End Time")
    event_rental_cancelled_value_in_advance = models.FloatField(
        default=0, blank=True, null=True, verbose_name="Cancelled Advance Value"
    )
    event_rental_payment_method = models.CharField(
        max_length=50, choices=PaymentMethod.choices, verbose_name="Payment Method"
    )
    event_rental_observation = models.TextField(
        blank=True, null=True, verbose_name="Observations"
    )
    event_rental_min_attendees = models.IntegerField(verbose_name="Min Attendees")
    event_rental_max_attendees = models.IntegerField(verbose_name="Max Attendees")
    event_rental_creation_date = models.DateTimeField(auto_now_add=True)

    promotion = models.ForeignKey(
        Promotion,
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name="event_rentals",
    )
    photos = GenericRelation(Photo, related_query_name="event_rentals")
    view_count = models.IntegerField(default=0, verbose_name="View Count")
    owner_rating = models.OneToOneField(
        Review,
        related_name="owner_event_rental",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )
    costumer_rating = models.OneToOneField(
        Review,
        related_name="customer_event_rental",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )
    current_status = models.OneToOneField(
        RentalStatusHistory,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    confirmation_code = models.CharField(max_length=50, blank=True, null=True)

    @property
    def event_rental_cost(self):
        total = self.event.event_reference_value if self.event else 0
        for service in self.event_rental_services.all():
            total += service.price
        if self.promotion:
            total -= total * self.promotion.promotion_discount_percentage / 100
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

    def clean(self):
        if self.event_rental_min_attendees > self.event_rental_max_attendees:
            raise errors.InvalidMinAttendeesError()

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        if is_new:
            initial_status = RentalStatusHistory.objects.create(
                rental=self, status=EventRentalStatus.PENDING.value, changed_by=None
            )
            self.current_status = initial_status
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.event} - {self.event_rental_date}"
