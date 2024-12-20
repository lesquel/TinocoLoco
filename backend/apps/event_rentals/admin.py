from django.contrib import admin
from apps.photos.admin import PhotoInline
from apps.reviews.admin import ReviewInline
from apps.contingencies.models import Contingency

# Register your models here.
from .models import EventRental, RentalStatusHistory, ServicesEventRental


class ServicesEventRentalInline(admin.TabularInline):
    model = ServicesEventRental
    extra = 0


class ContingencyInline(admin.TabularInline):
    model = Contingency
    extra = 0


@admin.register(EventRental)
class EventRentalAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "event",
        "owner",
        "event_rental_date",
        "current_status",
        "confirmation_code",
    ]
    list_filter = ["event_rental_date"]
    list_display_links = ["id", "event", "owner"]
    inlines = [PhotoInline, ServicesEventRentalInline, ContingencyInline, ReviewInline]


@admin.register(RentalStatusHistory)
class RentalStatusHistoryAdmin(admin.ModelAdmin):
    list_display = ["id", "rental", "status", "changed_by", "created_at"]
    list_filter = ["status"]
    list_display_links = ["id", "rental"]


@admin.register(ServicesEventRental)
class ServicesEventRentalAdmin(admin.ModelAdmin):
    list_display = ["id", "event_rental", "service", "service_quantity", "price"]
    list_filter = ["service"]
    list_display_links = ["id", "event_rental"]
