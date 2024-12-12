from rest_framework import viewsets
from users.permissions import IsAdminOrReadOnly
from base.system_services import ServiceService
from ..serializers import ServiceSerializer
from ..filters import ServiceFilter


class ServiceView(viewsets.ModelViewSet):
    serializer_class = ServiceSerializer
    http_method_names = ["get", "post", "put", "delete"]
    filterset_class = ServiceFilter
    permission_classes = [IsAdminOrReadOnly]
    queryset = ServiceService.get_all()
