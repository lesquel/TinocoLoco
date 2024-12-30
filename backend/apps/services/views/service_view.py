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
from apps.reviews.serializers import RetrieveReviewSerializer, CreateReviewSerializer
from apps.photos.serializers import CreatePhotoSerializer
from ..serializers import ServiceSerializer
from ..filters import ServiceFilter


class ServiceView(
    PaginationMixin,
    UploadImagesViewMixin,
    AddReviewMixin,
    RetrieveReviewsMixin,
    MetricsAnaliticsMixin,
    viewsets.ModelViewSet,
):
    http_method_names = ["get", "post", "put", "delete"]
    filterset_class = ServiceFilter
    permission_classes = [IsAdminOrReadOnly]
    queryset = ServiceService.get_all().order_by("-id")
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_serializer_class(self):
        
        action_serializers = {
            "create": ServiceSerializer,
            "add_review": CreateReviewSerializer,
            "reviews": RetrieveReviewSerializer,
            "upload_images": CreatePhotoSerializer,
            
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

    def get_better_rated_queryset(self):
        return ServiceService.get_better_rated()