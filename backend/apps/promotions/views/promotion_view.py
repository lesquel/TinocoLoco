from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from base.system_services import PromotionService
from base.mixins import PaginationMixin

from apps.users.permissions import IsAdminOrReadOnly
from apps.reviews.serializers import RetrieveReviewSerializer, CreateReviewSerializer

from ..serializers import CreatePromotionSerializer, RetrievePromotionSerializer
from ..filters import PromotionFilter


class PromotionView(viewsets.ModelViewSet, PaginationMixin):
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAdminOrReadOnly]
    queryset = PromotionService.get_all()
    filterset_class = PromotionFilter
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_serializer_class(self):
        if self.action in ["retrieve", "most_popular", "most_viewed"]:
            return RetrievePromotionSerializer
        elif self.action == "add_review":
            return CreateReviewSerializer
        elif self.action == "reviews":
            return RetrieveReviewSerializer
        return CreatePromotionSerializer
    
    def get_object(self):
        obj = PromotionService.get_by_id(self.kwargs.get("pk"))
        self.check_object_permissions(self.request, obj)
        return obj
    
    def retrieve(self, request, pk=None):
        promotion = self.get_object()
        promotion.increase_view_count()
        serializer = self.get_serializer(promotion)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"], url_path="most-popular")
    def most_popular(self, request):
        most_populars = PromotionService.get_most_populars()
        return self.paginate_and_respond(most_populars)
        
    @action(detail=False, methods=["get"], url_path="most-viewed")
    def most_viewed(self, request):
        most_viewed = PromotionService.get_most_viewed()
        return self.paginate_and_respond(most_viewed)


    @action(
        detail=True,
        methods=["post"],
        url_path="add-review",
        permission_classes=[IsAuthenticated],
    )
    def add_review(self, request, pk=None):
        promotion = self.get_object()
        user = request.user

        rating_score = request.data.get("rating_score")
        rating_comment = request.data.get("rating_comment")

        serializer = self.get_serializer(
            data={
                "author": user.id,
                "rating_score": rating_score,
                "rating_comment": rating_comment,
            },
            context={"related_instance": promotion},
        )

        serializer.is_valid(raise_exception=True)

        promotion = serializer.save()

        return Response(RetrieveReviewSerializer(instance=promotion).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["get"], url_path="reviews")
    def reviews(self, request, pk=None):
        promotions = self.get_object()
        reviews = promotions.reviews.all()
        return self.paginate_and_respond(reviews)