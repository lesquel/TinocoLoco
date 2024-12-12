from rest_framework import viewsets
from users.permissions import IsAdminOrReadOnly
from base.system_services import EventService
from ..filters import EventFilter
from ..serializers import EventSerializer


class EventView(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAdminOrReadOnly]
    queryset = EventService.get_all()
    filterset_class = EventFilter
