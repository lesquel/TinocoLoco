from django_filters import rest_framework as filters
from ..models import Service


class ServiceFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="service_name", lookup_expr="icontains")
    description = filters.CharFilter(
        field_name="service_description", lookup_expr="icontains"
    )
    min_cost = filters.NumberFilter(
        field_name="service_unitary_cost", lookup_expr="gte"
    )
    max_cost = filters.NumberFilter(
        field_name="service_unitary_cost", lookup_expr="lte"
    )

    creation_date = filters.DateFromToRangeFilter(field_name="service_creation_date")
    is_active = filters.BooleanFilter(field_name="is_active")
    category = filters.CharFilter(
        field_name="service_category__service_category_name", lookup_expr="icontains"
    )

    class Meta:
        model = Service
        fields = [
            "name",
            "description",
            "min_cost",
            "max_cost",
            "creation_date",
            "is_active",
            "category",
        ]
