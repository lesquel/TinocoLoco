from django_filters import rest_framework as filters
from ..models import ServiceCategory


class ServiceCategoryFilter(filters.FilterSet):
    name = filters.CharFilter(
        field_name="service_category_name", lookup_expr="icontains"
    )
    description = filters.CharFilter(
        field_name="service_category_description", lookup_expr="icontains"
    )
    created_at = filters.DateFromToRangeFilter(field_name="created_at")

    class Meta:
        model = ServiceCategory
        fields = ["name", "description"]
