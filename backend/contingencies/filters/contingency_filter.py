from django_filters import rest_framework as filters
from ..models import Contingency


class ContingencyFilter(filters.FilterSet):
    event = filters.CharFilter(field_name="event__event_name", lookup_expr="icontains")
    description = filters.CharFilter(lookup_expr="icontains")
    impact_level = filters.CharFilter(lookup_expr="icontains")
    category = filters.CharFilter(
        field_name="contingency_category__category_name", lookup_expr="icontains"
    )
    penalty_amount = filters.NumberFilter(field_name="contingency_penalty_amount")
    date_occurred = filters.DateFromToRangeFilter(
        field_name="contingency_date_occurred"
    )

    class Meta:
        model = Contingency
        fields = [
            "event",
            "description",
            "impact_level",
            "category",
            "penalty_amount",
            "date_occurred",
        ]
