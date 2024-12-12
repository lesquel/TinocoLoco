from rest_framework import viewsets
from users.permissions import IsAdminOrReadOnly

from base.system_services import EventCategoryService
from ..filters import EventCategoryFilter
from ..serializers import RetrieveEventCategorySerializer,CreateEventCategorySerializer

class EventCategoryView(viewsets.ModelViewSet):
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAdminOrReadOnly]
    queryset = EventCategoryService.get_all()
    filterset_class = EventCategoryFilter


    def get_serializer_class(self):
        if self.action == "get":
            return RetrieveEventCategorySerializer
        return CreateEventCategorySerializer