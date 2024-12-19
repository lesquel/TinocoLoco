from django_filters import rest_framework as filters
from ..models import PromotionCategory


class PromotionCategoryFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="promotion_category_name",lookup_expr='icontains')
    description = filters.CharFilter(field_name="promotion_category_description",lookup_expr='icontains')
    created_at = filters.DateFromToRangeFilter(field_name="created_at")
    is_active = filters.BooleanFilter(field_name="is_active")
    class Meta:
        model = PromotionCategory
        fields = ["name", "description", "created_at", "is_active"]
