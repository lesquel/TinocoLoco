from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
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
        if self.action in ["retrieve", "most_popular", "most_viewed"]:
            return RetrievePromotionSerializer
        return CreatePromotionSerializer

    def retrieve(self, request, pk=None):
        promotion = PromotionService.get_by_id(pk)
        promotion.increment_visualizations()
        serializer = self.get_serializer(promotion)
        return Response({"event": serializer.data})

    @action(detail=False, methods=["get"], url_path="most-popular")
    def most_popular(self, request):
        queryset = PromotionService.get_most_populars()
        serializer = self.get_serializer(queryset, many=True)
        return Response({"most_popular": serializer.data})

    @action(detail=False, methods=["get"], url_path="most-viewed")
    def most_viewed(self, request):
        queryset = PromotionService.get_most_viewed()
        serializer = self.get_serializer(queryset, many=True)
        return Response({"most_viewed": serializer.data}, status=status.HTTP_200_OK)
