from django.contrib import admin

# Register your models here.
from .models import EventRental,RentalStatusHistory

admin.site.register(EventRental)

admin.site.register(RentalStatusHistory)

