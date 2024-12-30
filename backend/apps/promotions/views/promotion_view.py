from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from base.system_services import PromotionService
from base.mixins import (
    PaginationMixin,
    MetricsAnaliticsMixin,
    AddReviewMixin,
    RetrieveReviewsMixin,
)

from apps.users.permissions import IsAdminOrReadOnly
from apps.reviews.serializers import RetrieveReviewSerializer, CreateReviewSerializer

from ..serializers import CreatePromotionSerializer, RetrievePromotionSerializer
from ..filters import PromotionFilter


class PromotionView(
    MetricsAnaliticsMixin,
    PaginationMixin,
    AddReviewMixin,
    RetrieveReviewsMixin,
    viewsets.ModelViewSet,
):
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAdminOrReadOnly]
    queryset = PromotionService.get_all()
    filterset_class = PromotionFilter
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_serializer_class(self):
        serializer_classes = {
            "retrieve": RetrievePromotionSerializer,
            "list": RetrievePromotionSerializer,
            "most_popular": RetrievePromotionSerializer,
            "most_viewed": RetrievePromotionSerializer,
            "add_review": CreateReviewSerializer,
            "reviews": RetrieveReviewSerializer,
        }
        return serializer_classes.get(self.action, CreatePromotionSerializer)

    def get_object(self):
        obj = PromotionService.get_by_id(self.kwargs.get("pk"))
        self.check_object_permissions(self.request, obj)
        return obj

    def get_most_viewed_queryset(self):
        return PromotionService.get_most_viewed()

    def get_most_popular_queryset(self):
        return PromotionService.get_most_populars()

    def get_better_rated_queryset(self):
        return PromotionService.get_better_rated()
