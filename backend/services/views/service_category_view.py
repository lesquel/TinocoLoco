from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser
from users.permissions import IsAdminOrReadOnly

from base.system_services import ServiceCategoryService
from ..serializers import (
    CreateServiceCategorySerializer,
    RetrieveServiceCategorySerializer,
)
from ..filters import ServiceCategoryFilter


class ServiceCategoryView(viewsets.ModelViewSet):
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser]
    queryset = ServiceCategoryService.get_all()
    filterset_class = ServiceCategoryFilter

    def get_serializer_class(self):
        if self.action in ["create", "update"]:
            return CreateServiceCategorySerializer
        return RetrieveServiceCategorySerializer
