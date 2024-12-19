from rest_framework import viewsets

from rest_framework.parsers import MultiPartParser
from apps.users.permissions import IsAdminOrReadOnly
from base.system_services import EventCategoryService
from ..filters import EventCategoryFilter
from ..serializers import RetrieveEventCategorySerializer, CreateEventCategorySerializer


class EventCategoryView(viewsets.ModelViewSet):
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAdminOrReadOnly]
    queryset = EventCategoryService.get_all().order_by("id")
    filterset_class = EventCategoryFilter
    parser_classes = [MultiPartParser]

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return RetrieveEventCategorySerializer
        return CreateEventCategorySerializer
