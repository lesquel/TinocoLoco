from django_filters import rest_framework as filters
from ..models import Review


class ReviewFilter(filters.FilterSet):
    author = filters.CharFilter(field_name="author__username", lookup_expr="iexact")
    min_score = filters.NumberFilter(field_name="rating_score", lookup_expr="gte")
    max_score = filters.NumberFilter(field_name="rating_score", lookup_expr="lte")
    created_at = filters.DateFromToRangeFilter(field_name="created_at")
    class Meta:
        model = Review
        fields = ["author", "rating_score", "min_score", "max_score", "created_at"]