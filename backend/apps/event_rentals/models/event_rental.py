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
from .rental_status_history import RentalStatusHistory


class EventRental(DirtyFieldsMixin, models.Model):
    event = models.ForeignKey(
        Event, on_delete=models.CASCADE, related_name="event_rentals"
    )

    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    event_rental_date = models.DateField()
    event_rental_start_time = models.TimeField()
    event_rental_planified_end_time = models.TimeField()
    event_rental_end_time = models.TimeField()
    event_rental_cost = models.FloatField()
    event_rental_cancelled_value_in_advance = models.FloatField(
        default=0, blank=True, null=True
    )
    event_rental_payment_method = models.CharField(
        max_length=50, choices=PaymentMethod.choices
    )
    event_rental_observation = models.TextField(blank=True, null=True)
    event_rental_min_attendees = models.IntegerField()
    event_rental_max_attendees = models.IntegerField()
    event_rental_creation_date = models.DateTimeField(auto_now_add=True)

    promotions = models.ManyToManyField(
        Promotion, blank=True, related_name="event_rentals"
    )

    photos = GenericRelation(Photo, related_query_name="event_rentals")
    view_count = models.IntegerField(default=0)

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
        RentalStatusHistory, on_delete=models.CASCADE, null=True, blank=True
    )

    confirmation_code = models.CharField(max_length=50, blank=True, null=True)

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
