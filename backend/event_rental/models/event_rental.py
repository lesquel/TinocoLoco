from django.db import models
from event.models import Event
from generics.models import Rating
from event_rental.choices import PaymentMethod
from .admin_rating import AdminRating
from .promotion import Promotion
from service.models import Service

class EventRental(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    event_rental_date = models.DateField()
    event_rental_start_time = models.TimeField()
    event_rental_planified_end_time = models.TimeField()
    event_rental_end_time = models.TimeField()
    event_rental_cost = models.FloatField()
    event_rental_cancelled_value_in_advance = models.FloatField()
    event_rental_payment_method = models.CharField(max_length=50, choices=PaymentMethod.choices)
    event_rental_observation = models.TextField()
    event_rental_min_attendees = models.IntegerField()
    event_rental_max_attendees = models.IntegerField()
    promotions = models.ManyToManyField(Promotion, blank=True)
    services = models.ManyToManyField(Service, blank=True, related_name="event_rentals")


    customer_rating = models.OneToOneField(
        Rating, related_name='customer_event_rental', null=True, blank=True, on_delete=models.SET_NULL
    )
    owner_rating = models.OneToOneField(
        AdminRating, related_name='owner_event_rental', null=True, blank=True, on_delete=models.SET_NULL
    )

    def __str__(self):
        return f"{self.event} - {self.event_rental_date}"
