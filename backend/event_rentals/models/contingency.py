from django.db import models
from .event_rental import EventRental


class Contingency(models.Model):
    event = models.ForeignKey(EventRental, on_delete=models.CASCADE)
    description = models.TextField()
    valuePenalty = models.DecimalField(max_digits=10, decimal_places=2)
    date_occurred = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Contingency for {self.event.event_name} on {self.date_occurred}"