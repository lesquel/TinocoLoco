from rest_framework import viewsets
from users.permissions import IsAdminOrReadOnly

from ..models import EventCategory
from ..serializers import EventCategorySerializer

class EventCategoryView(viewsets.ModelViewSet):
    serializer_class = EventCategorySerializer
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAdminOrReadOnly]
    queryset = EventCategory.objects.all()