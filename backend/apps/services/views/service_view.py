from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser


from base.system_services import ServiceService
from base.mixins import (
    PaginationMixin,
    UploadImagesViewMixin,
    AddReviewMixin,
    RetrieveReviewsMixin,
    MetricsAnaliticsMixin,
)

from apps.users.permissions import IsAdminOrReadOnly
from apps.reviews.serializers import RetrieveReviewSerializer
from ..serializers import ServiceSerializer
from ..filters import ServiceFilter


class ServiceView(
    viewsets.ModelViewSet,
    PaginationMixin,
    UploadImagesViewMixin,
    AddReviewMixin,
    RetrieveReviewsMixin,
    MetricsAnaliticsMixin,
):
    http_method_names = ["get", "post", "put", "delete"]
    filterset_class = ServiceFilter
    permission_classes = [IsAdminOrReadOnly]
    queryset = ServiceService.get_all().order_by("-id")
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_serializer_class(self):
        
        action_serializers = {
            "create": ServiceSerializer,
            "reviews": RetrieveReviewSerializer,
        }
        return action_serializers.get(self.action, ServiceSerializer)

    def get_object(self):
        obj = ServiceService.get_by_id(self.kwargs.get("pk"))
        self.check_object_permissions(self.request, obj)
        return obj

    def get_most_viewed_queryset(self):
        return ServiceService.get_most_viewed()

    def get_most_popular_queryset(self):
        return ServiceService.get_most_populars()
