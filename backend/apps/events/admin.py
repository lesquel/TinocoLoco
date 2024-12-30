from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from apps.photos.admin import PhotoInline
from apps.reviews.admin import ReviewInline
from .models import Event, EventCategory


class EventResource(resources.ModelResource):
    class Meta:
        model = Event
        fields = (
            "id",
            "event_name",
            "event_reference_value",
            "event_allowed_hours",
            "event_extra_hour_rate",
            "event_category__event_category_name",
            "creation_date",
        )
        export_order = (
            "id",
            "event_name",
            "event_reference_value",
            "event_allowed_hours",
            "event_extra_hour_rate",
            "event_category__event_category_name",
            "creation_date",
        )


class EventCategoryResource(resources.ModelResource):
    class Meta:
        model = EventCategory
        fields = (
            "id",
            "event_category_name",
            "event_category_description",
            "creation_date",
        )
        export_order = (
            "id",
            "event_category_name",
            "event_category_description",
            "creation_date",
        )


@admin.register(Event)
class EventAdmin(ImportExportModelAdmin):
    resource_class = EventResource
    list_display = [
        "id",
        "event_name",
        "event_reference_value",
        "event_allowed_hours",
        "event_extra_hour_rate",
        "event_category",
    ]
    search_fields = [
        "event_name",
        "event_category__event_category_name",
    ]
    list_filter = [
        "event_category",
        "creation_date",
    ]
    inlines = [PhotoInline, ReviewInline]


@admin.register(EventCategory)
class EventCategoryAdmin(ImportExportModelAdmin):
    resource_class = EventCategoryResource
    list_display = [
        "id",
        "event_category_name",
        "event_category_description",
        "creation_date",
    ]
    search_fields = ["event_category_name"]
    list_filter = ["creation_date"]
