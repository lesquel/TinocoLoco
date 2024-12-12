from rest_framework import viewsets
from users.permissions import IsAdminOrReadOnly

from base.system_services import PromotionCategoryService
from ..serializers import PromotionCategorySerializer
from ..filters import PromotionCategoryFilter

class PromotionCategoryView(viewsets.ModelViewSet):
    serializer_class = PromotionCategorySerializer
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAdminOrReadOnly]
    queryset = PromotionCategoryService.get_all().order_by('id')
    filterset_class = PromotionCategoryFilter