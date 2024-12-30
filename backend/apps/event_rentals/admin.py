from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from apps.photos.admin import PhotoInline
from apps.reviews.admin import ReviewInline
from apps.contingencies.models import Contingency
from .models import EventRental, RentalStatusHistory, ServicesEventRental


class ServicesEventRentalInline(admin.TabularInline):
    model = ServicesEventRental
    extra = 0


class ContingencyInline(admin.TabularInline):
    model = Contingency
    extra = 0

class EventRentalResource(resources.ModelResource):
    class Meta:
        model = EventRental
        fields = (
            "id",
            "event__event_name",
            "owner__username",
            "event_rental_date",
            "current_status",
            "confirmation_code",
            "created_at",
        )
        export_order = (
            "id",
            "event__event_name",
            "owner__username",
            "event_rental_date",
            "current_status",
            "confirmation_code",
            "created_at",
        )


class RentalStatusHistoryResource(resources.ModelResource):
    class Meta:
        model = RentalStatusHistory
        fields = (
            "id",
            "rental__id",
            "status",
            "changed_by__username",
            "created_at",
        )
        export_order = (
            "id",
            "rental__id",
            "status",
            "changed_by__username",
            "created_at",
        )


class ServicesEventRentalResource(resources.ModelResource):
    class Meta:
        model = ServicesEventRental
        fields = (
            "id",
            "event_rental__id",
            "service__service_name",
            "service_quantity",
            "price",
        )
        export_order = (
            "id",
            "event_rental__id",
            "service__service_name",
            "service_quantity",
            "price",
        )

@admin.register(EventRental)
class EventRentalAdmin(ImportExportModelAdmin):
    resource_class = EventRentalResource
    list_display = [
        "id",
        "event",
        "owner",
        "event_rental_date",
        "current_status",
        "confirmation_code",
    ]
    list_filter = ["event_rental_date"]
    inlines = [PhotoInline, ServicesEventRentalInline, ContingencyInline, ReviewInline]

@admin.register(RentalStatusHistory)
class RentalStatusHistoryAdmin(ImportExportModelAdmin):
    resource_class = RentalStatusHistoryResource
    list_display = ["id", "rental", "status", "changed_by", "created_at"]
    list_filter = ["status"]

@admin.register(ServicesEventRental)
class ServicesEventRentalAdmin(ImportExportModelAdmin):
    resource_class = ServicesEventRentalResource
    list_display = ["id", "event_rental", "service", "service_quantity", "price"]
    list_filter = ["service"]
