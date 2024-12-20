from django.contrib import admin

# Register your models here.
from .models import Event, EventCategory

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = [
        "event_name",
        "event_reference_value",
        "event_allowed_hours",
        "event_extra_hour_rate",
        "event_category",
    ]
    
    search_fields = [
        "event_name",
        "event_category",
    ]
    
    list_filter = [
        "event_category",
        "creation_date",
    ]
    
    list_display_links = [
        "event_name",
        "event_category",
    ]

@admin.register(EventCategory)
class EventCategoryAdmin(admin.ModelAdmin):
    list_display = ["event_category_name", "event_category_description","creation_date"]
    search_fields = ["event_category_name"]
    list_filter = ["creation_date"]
