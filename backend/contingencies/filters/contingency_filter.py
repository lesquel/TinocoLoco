from django_filters import rest_framework as filters
from ..models import Contingency


class ContingencyFilter(filters.FilterSet):
    event_rental = filters.CharFilter(field_name="event_rental_id", lookup_expr="exact")
    description = filters.CharFilter(
        field_name="contingency_description", lookup_expr="icontains"
    )
    impact_level = filters.CharFilter(
        field_name="contingency_impact_level", lookup_expr="icontains"
    )
    category = filters.CharFilter(
        field_name="contingency_category", lookup_expr="icontains"
    )
    max_penalty_amount = filters.NumberFilter(
        field_name="contingency_penalty_amount", lookup_expr="lte"
    )
    min_penalty_amount = filters.NumberFilter(
        field_name="contingency_penalty_amount", lookup_expr="gte"
    )

    date_occurred = filters.DateFromToRangeFilter(
        field_name="contingency_date_occurred"
    )

    class Meta:
        model = Contingency
        fields = [
            "event_rental",
            "description",
            "impact_level",
            "category",
            "max_penalty_amount",
            "min_penalty_amount",
            "date_occurred",
        ]
