from rest_framework import viewsets
from base.system_services import ContingencyService
from apps.users.permissions import IsAdminOrReadOnly
from ..filters import ContingencyFilter
from ..serializers import ContingencySerializer

# Create your views here.


class ContingencyView(viewsets.ModelViewSet):
    serializer_class = ContingencySerializer
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAdminOrReadOnly]
    queryset = ContingencyService.get_all().order_by("contingency_date_occurred")
    filterset_class = ContingencyFilter

