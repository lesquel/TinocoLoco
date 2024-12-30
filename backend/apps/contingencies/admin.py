from django.contrib import admin

from .models import Contingency


@admin.register(Contingency)
class ContingencyAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "get_event_rental_id",
        "contingency_impact_level",
        "contingency_category",
        "contingency_penalty_amount",
        "contingency_date_occurred",
    )
    list_filter = (
        "contingency_impact_level",
        "contingency_category",
        "contingency_time_occurred",
    )
    search_fields = (
        "event_rental__id",
        "contingency_description",
    )

    def get_event_rental_id(self, obj):
        return obj.event_rental.id
    get_event_rental_id.short_description = "Event Rental ID"
