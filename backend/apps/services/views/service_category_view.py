from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from apps.users.permissions import IsAdminOrReadOnly

from base.system_services import ServiceCategoryService

from ..filters import ServiceCategoryFilter
from ..serializers import (
    CreateServiceCategorySerializer,
    RetrieveServiceCategorySerializer,
)


class ServiceCategoryView(viewsets.ModelViewSet):
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    queryset = ServiceCategoryService.get_all()
    filterset_class = ServiceCategoryFilter

    def get_serializer_class(self):
        if self.action in ["create", "update"]:
            return CreateServiceCategorySerializer
        return RetrieveServiceCategorySerializer
