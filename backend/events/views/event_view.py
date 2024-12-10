from rest_framework import viewsets
from users.permissions import IsAdminOrReadOnly
from ..models import Event
from ..serializers import EventSerializer


class EventView(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAdminOrReadOnly]
    queryset = Event.objects.all()