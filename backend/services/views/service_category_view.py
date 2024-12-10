from rest_framework import viewsets
from users.permissions import IsAdminOrReadOnly

from ..models import ServiceCategory
from ..serializers import ServiceCategorySerializer

class ServiceCategoryView(viewsets.ModelViewSet):
    serializer_class = ServiceCategorySerializer
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAdminOrReadOnly]
    queryset = ServiceCategory.objects.all()