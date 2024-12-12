from django_filters import rest_framework as filters
from ..models import ContingencyCategory


class ContingencyCategoryFilter(filters.FilterSet):
    name = filters.CharFilter(
        field_name="contingency_category_name", lookup_expr="icontains"
    )
    description = filters.CharFilter(
        field_name="contingency_category_description", lookup_expr="icontains"
    )
    created_at = filters.DateFromToRangeFilter(field_name="created_at")

    class Meta:
        model = ContingencyCategory
        fields = ["name", "description", "created_at"]
