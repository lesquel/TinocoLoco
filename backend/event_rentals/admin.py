from django.contrib import admin

# Register your models here.
from .models import EventRental,AdminRating,RentalStatusHistory

admin.site.register(EventRental)

admin.site.register(AdminRating)
admin.site.register(RentalStatusHistory)

