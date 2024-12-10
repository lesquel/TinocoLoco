from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAdminUser
from ..models import ServiceCategory
from ..serializers import ServiceCategorySerializer


class ServiceCategoryView(viewsets.ModelViewSet):
    serializer_class = ServiceCategorySerializer
    http_method_names = ["get", "post", "put", "delete"]
    queryset = ServiceCategory.objects.all()

    def get_permissions(self):
        if self.action == "list" or self.action == "retrieve":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]
