from django.db import models
from .event_category import EventCategory


class Event(models.Model):
    event_name = models.CharField(max_length=100)
    event_description = models.CharField(max_length=500)
    event_reference_value = models.DecimalField(max_digits=10, decimal_places=2)
    event_allowed_hours = models.IntegerField()
    event_extra_hour_rate = models.DecimalField(max_digits=10, decimal_places=2)
    event_creation_date = models.DateField(auto_now_add=True)
    event_last_actualization_date = models.DateField(auto_now=True)
    event_type = models.ForeignKey(EventCategory, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.event_name