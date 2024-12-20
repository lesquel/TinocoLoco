from django.contrib import admin

# Register your models here.
from .models import EventRental,RentalStatusHistory,ServicesEventRental


class EventRentalAdmin(admin.ModelAdmin):
    list_display = ['id','event', "owner",'event_rental_date','current_status','confirmation_code', ]
    list_filter = ['event_rental_date']
    list_display_links = ['id','event', "owner"]

class RentalStatusHistoryAdmin(admin.ModelAdmin):
    list_display = ['id','rental','status','changed_by','created_at']
    list_filter = ['status']
    list_display_links = ['id','rental']

class ServicesEventRentalAdmin(admin.ModelAdmin):
    list_display = ['id','event_rental','service','service_quantity','price']
    list_filter = ['service']
    list_display_links = ['id','event_rental']

admin.site.register(EventRental)
admin.site.register(RentalStatusHistory)
admin.site.register(ServicesEventRental)

