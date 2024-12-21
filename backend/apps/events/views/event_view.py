from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import IsAuthenticated

from base.system_services import EventService
from base.mixins import PaginationMixin

from apps.users.permissions import IsAdminOrReadOnly
from apps.reviews.serializers import RetrieveReviewSerializer, CreateReviewSerializer
from apps.photos.serializers import CreatePhotoSerializer, RetrievePhotoSerializer
from base.utils import errors
from ..filters import EventFilter
from ..serializers import EventSerializer


class EventView(viewsets.ModelViewSet, PaginationMixin):
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAdminOrReadOnly]
    queryset = EventService.get_all()
    filterset_class = EventFilter
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_serializer_class(self):
        if self.action == "upload_images":
            return CreatePhotoSerializer
        elif self.action == "add_review":
            return CreateReviewSerializer
        return EventSerializer

    def get_object(self):
        obj = EventService.get_by_id(self.kwargs.get("pk"))
        self.check_object_permissions(self.request, obj)
        return obj

    def retrieve(self, request, pk=None):
        event = self.get_object()
        event.increase_view_count()
        serializer = self.get_serializer(instance=event)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"], url_path="most-popular")
    def most_popular(self, request):
        most_populars = EventService.get_most_populars()
        return self.paginate_and_respond(most_populars)

    @action(detail=False, methods=["get"], url_path="most-viewed")
    def most_viewed(self, request):
        most_viewed = EventService.get_most_viewed()
        return self.paginate_and_respond(most_viewed)

    @action(detail=True, methods=["post"], url_path="upload-images")
    def upload_images(self, request, pk=None):
        event = self.get_object()
        images = request.FILES.getlist("images")
        if not images:
            raise errors.business_logic_errors.MustProvideImageError()

        serializer = self.get_serializer(
            data={"images": images},
            context={"related_instance": event},
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
        user = request.user

        rating_score = request.data.get("rating_score")
        rating_comment = request.data.get("rating_comment")

        serializer = self.get_serializer(
            data={
                "author": user.id,
                "rating_score": rating_score,
                "rating_comment": rating_comment,
            },
            context={"related_instance": event_rental},
        )

        serializer.is_valid(raise_exception=True)

        service = serializer.save()

        return Response(RetrieveReviewSerializer(instance=service).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["get"], url_path="reviews")
    def reviews(self, request, pk=None):
        service = self.get_object()
        reviews = service.reviews.all()
        return self.paginate_and_respond(reviews)