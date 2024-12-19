from django_filters import rest_framework as filters
from ..models import ServiceCategory


class ServiceCategoryFilter(filters.FilterSet):
    name = filters.CharFilter(
        field_name="service_category_name", lookup_expr="icontains"
    )
    description = filters.CharFilter(
        field_name="service_category_description", lookup_expr="icontains"
    )
    creation_date = filters.DateFromToRangeFilter(field_name="creation_date")
    
    is_active = filters.BooleanFilter(field_name="is_active")

    class Meta:
        model = ServiceCategory
        fields = ["name", "description", "creation_date", "is_active"]
