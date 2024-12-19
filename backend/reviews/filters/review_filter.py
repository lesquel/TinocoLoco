from django_filters import rest_framework as filters
from ..models import Review


class ReviewFilter(filters.FilterSet):
    author = filters.CharFilter(field_name="author_id", lookup_expr="exact")
    min_score = filters.NumberFilter(field_name="rating_score", lookup_expr="gte")
    max_score = filters.NumberFilter(field_name="rating_score", lookup_expr="lte")
    created_at = filters.DateFromToRangeFilter(field_name="created_at")
    class Meta:
        model = Review
        fields = ["author", "rating_score", "min_score", "max_score", "created_at"]