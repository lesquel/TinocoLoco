from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from base.system_services import EventService
from base.mixins import (
    PaginationMixin,
    UploadImagesViewMixin,
    AddReviewMixin,
    RetrieveReviewsMixin,
    MetricsAnaliticsMixin,
)
from apps.reviews.serializers import RetrieveReviewSerializer
from apps.users.permissions import IsAdminOrReadOnly
from base.utils import errors
from ..filters import EventFilter
from ..serializers import EventSerializer


class EventView(
    viewsets.ModelViewSet,
    PaginationMixin,
    UploadImagesViewMixin,
    AddReviewMixin,
    RetrieveReviewsMixin,
    MetricsAnaliticsMixin,
):
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAdminOrReadOnly]
    queryset = EventService.get_all().order_by("-creation_date")
    filterset_class = EventFilter
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_serializer_class(self):
        action_serializers = {
            "create": EventSerializer,
            "reviews": RetrieveReviewSerializer,
        }
        return action_serializers.get(self.action, EventSerializer)

    def get_object(self):
        obj = EventService.get_by_id(self.kwargs.get("pk"))
        self.check_object_permissions(self.request, obj)
        return obj

    def get_most_viewed_queryset(self):
        return EventService.get_most_viewed()

    def get_most_popular_queryset(self):
        return EventService.get_most_populars()
