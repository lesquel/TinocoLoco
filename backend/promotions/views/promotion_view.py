from rest_framework import viewsets
from users.permissions import IsAdminOrReadOnly
from base.system_services import PromotionService
from ..serializers import PromotionSerializer
from ..filters import PromotionFilter

class PromotionView(viewsets.ModelViewSet):
    serializer_class = PromotionSerializer
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAdminOrReadOnly]
    queryset = PromotionService.get_all()
    filterset_class = PromotionFilter