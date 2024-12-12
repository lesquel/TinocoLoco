from django_filters import rest_framework as filters
from ..models import Promotion


class PromotionFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="promotion_name", lookup_expr="icontains")
    description = filters.CharFilter(
        field_name="promotion_description", lookup_expr="icontains"
    )
    category = filters.CharFilter(
        field_name="promotion_category__promotion_category_name",
        lookup_expr="icontains",
    )
    discount_percentage = filters.NumberFilter(
        field_name="promotion_discount_percentage", lookup_expr="icontains"
    )
    valid_from = filters.DateFilter(field_name="valid_from", lookup_expr="icontains")
    valid_until = filters.DateFilter(field_name="valid_until", lookup_expr="icontains")

    class Meta:
        model = Promotion
        fields = [
            "name",
            "description",
            "category",
            "discount_percentage",
            "valid_from",
            "valid_until",
        ]
