from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated


from base.system_services import ServiceService
from base.mixins import PaginationMixin

from apps.users.permissions import IsAdminOrReadOnly
from apps.reviews.serializers import RetrieveReviewSerializer, CreateReviewSerializer
from apps.photos.serializers import CreatePhotoSerializer, RetrievePhotoSerializer
from base.utils import errors

from ..serializers import ServiceSerializer
from ..filters import ServiceFilter


class ServiceView(viewsets.ModelViewSet, PaginationMixin):
    http_method_names = ["get", "post", "put", "delete"]
    filterset_class = ServiceFilter
    permission_classes = [IsAdminOrReadOnly]
    queryset = ServiceService.get_all()
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_serializer_class(self):
        if self.action == "upload_images":
            return CreatePhotoSerializer
        elif self.action == "add_review":
            return CreateReviewSerializer
        elif self.action == "reviews":
            return RetrieveReviewSerializer
        return ServiceSerializer

    def get_object(self):
        obj = ServiceService.get_by_id(self.kwargs.get("pk"))
        self.check_object_permissions(self.request, obj)
        return obj

    def retrieve(self, request, pk=None):
        service = self.get_object()
        service.increase_view_count()
        serializer = self.get_serializer(instance=service)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"], url_path="most-popular")
    def most_popular(self, request):
        most_populars = ServiceService.get_most_populars()
        return self.paginate_and_respond(most_populars)

    @action(detail=False, methods=["get"], url_path="most-viewed")
    def most_viewed(self, request):
        most_viewd = ServiceService.get_most_viewed()
        return self.paginate_and_respond(most_viewd)

    @action(detail=True, methods=["post"], url_path="upload-images")
    def upload_images(self, request, pk=None):
        service = self.get_object()
        images = request.FILES.getlist("images")
        if not images:
            raise errors.business_logic_errors.MustProvideImageError()

        serializer = self.get_serializer(
            data={"images": images},
            context={"related_instance": service},
        )
        serializer.is_valid(raise_exception=True)

        photos = serializer.save()

        return Response(
            RetrievePhotoSerializer(instance=photos, many=True).data,
            status=status.HTTP_201_CREATED,
        )

    @action(
        detail=True,
        methods=["post"],
        url_path="add-review",
        permission_classes=[IsAuthenticated],
    )
    def add_review(self, request, pk=None):
        event_rental = self.get_object()

        rating_score = request.data.get("rating_score")
        rating_comment = request.data.get("rating_comment")

        serializer = self.get_serializer(
            data={
                "rating_score": rating_score,
                "rating_comment": rating_comment,
            },
            context={"related_instance": event_rental, "owner": request.user},
        )

        serializer.is_valid(raise_exception=True)
        service = serializer.save()

        return Response(
            RetrieveReviewSerializer(instance=service).data,
            status=status.HTTP_201_CREATED,
        )

    @action(detail=True, methods=["get"], url_path="reviews")
    def reviews(self, request, pk=None):
        service = self.get_object()
        reviews = service.reviews.all()
        return self.paginate_and_respond(reviews)
