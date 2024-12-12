from django_filters import rest_framework as filters
from ..models import EventCategory


class EventCategoryFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="event_category_name", lookup_expr="icontains")
    description = filters.CharFilter(
        field_name="event_category_description", lookup_expr="icontains"
    )
    created_at = filters.DateFromToRangeFilter(field_name="created_at")

    class Meta:
        model = EventCategory
        fields = ["name", "description", "created_at"]
