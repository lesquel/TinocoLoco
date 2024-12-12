from django_filters import rest_framework as filters
from ..models import Event


class EventFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="event_name", lookup_expr="icontains")
    description = filters.CharFilter(
        field_name="event_description", lookup_expr="icontains"
    )

    min_reference_value = filters.NumberFilter(
        field_name="event_reference_value", lookup_expr="gte"
    )
    max_reference_value = filters.NumberFilter(
        field_name="event_reference_value", lookup_expr="lte"
    )
    min_allowed_hours = filters.NumberFilter(
        field_name="event_allowed_hours", lookup_expr="gte"
    )
    max_allowed_hours = filters.NumberFilter(
        field_name="event_allowed_hours", lookup_expr="lte"
    )

    extra_hour_rate = filters.NumberFilter(field_name="event_extra_hour_rate")
    creation_date = filters.DateFromToRangeFilter(field_name="event_creation_date")
    last_actualization_date = filters.DateFromToRangeFilter(
        field_name="event_last_actualization_date"
    )
    category = filters.CharFilter(
        field_name="event_category__event_category_name", lookup_expr="icontains"
    )

    class Meta:
        model = Event
        fields = [
            "name",
            "description",
            "min_reference_value",
            "max_reference_value",
            "min_allowed_hours",
            "max_allowed_hours",
            "extra_hour_rate",
            "creation_date",
            "last_actualization_date",
            "category",
        ]
