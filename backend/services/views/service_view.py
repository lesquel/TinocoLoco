from rest_framework import viewsets
from users.permissions import IsAdminOrReadOnly
from ..models import Service
from ..serializers import ServiceSerializer


class ServiceView(viewsets.ModelViewSet):
    serializer_class = ServiceSerializer
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAdminOrReadOnly]
    queryset = Service.objects.all()