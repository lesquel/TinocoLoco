from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser
from users.permissions import IsAdminOrReadOnly
from base.system_services import PromotionService
from ..serializers import CreatePromotionSerializer, RetrievePromotionSerializer
from ..filters import PromotionFilter

class PromotionView(viewsets.ModelViewSet):
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAdminOrReadOnly]
    queryset = PromotionService.get_all()
    filterset_class = PromotionFilter
    parser_classes = [MultiPartParser]
    
    def get_serializer_class(self):
        if self.action == "retrieve":
            return RetrievePromotionSerializer
        return CreatePromotionSerializer