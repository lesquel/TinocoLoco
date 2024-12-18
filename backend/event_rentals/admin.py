from django.contrib import admin

# Register your models here.
from .models import EventRental,RentalStatusHistory,ServicesEventRental

admin.site.register(EventRental)
admin.site.register(ServicesEventRental)
admin.site.register(RentalStatusHistory)

