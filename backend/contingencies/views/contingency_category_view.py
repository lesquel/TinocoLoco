from rest_framework import viewsets
from users.permissions import IsAdminOrReadOnly
from base.system_services import ContingencyCategoryService
from ..filters import ContingencyCategoryFilter
from ..serializers import ContingencyCategorySerializer

# Create your views here.


class ContingencyCategoryView(viewsets.ModelViewSet):
    serializer_class = ContingencyCategorySerializer
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAdminOrReadOnly]
    queryset = ContingencyCategoryService.get_all().order_by("created_at")
    filterset_class = ContingencyCategoryFilter
