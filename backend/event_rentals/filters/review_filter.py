from django_filters import rest_framework as filters
from ..models import Review


class ReviewFilter(filters.FilterSet):
    
    class Meta:
        model = Review
        fields = []