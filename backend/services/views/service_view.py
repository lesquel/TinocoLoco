from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from django.utils.translation import gettext as _

from users.permissions import IsAdminOrReadOnly
from base.system_services import ServiceService

from reviews.serializers import RetrieveReviewSerializer, CreateReviewSerializer
from photos.serializers import CreatePhotoSerializer, RetrievePhotoSerializer
from ..serializers import ServiceSerializer
from ..filters import ServiceFilter


class ServiceView(viewsets.ModelViewSet):
    http_method_names = ["get", "post", "put", "delete"]
    filterset_class = ServiceFilter
    permission_classes = [IsAdminOrReadOnly]
    queryset = ServiceService.get_all()
    parser_classes = [MultiPartParser, FormParser]

    def get_serializer_class(self):
        if self.action == "upload_image":
            return CreatePhotoSerializer
        elif self.action == "add_review":
            return CreateReviewSerializer
        return ServiceSerializer

    def get_object(self):
        obj = ServiceService.get_by_id(self.kwargs.get("pk"))
        self.check_object_permissions(self.request, obj)
        return obj
    
    
    def retrieve(self, request, pk=None):
        service = self.get_object()
        service.increase_view_count()
        serializer = self.get_serializer(instance=service)
        print("serializer", serializer.data)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_path="most-popular")
    def most_popular(self, request):
        queryset = ServiceService.get_most_populars()
        serializer = self.get_serializer(queryset, many=True)
        return Response({"most_popular": serializer.data}, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"], url_path="most-viewed")
    def most_viewed(self, request):
        queryset = ServiceService.get_most_viewed()
        serializer = self.get_serializer(queryset, many=True)
        return Response({"most_viewed": serializer.data}, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"], url_path="upload-photo")
    def upload_image(self, request, pk=None):
        service = self.get_object()
        image = request.FILES.get("image")

        serializer = self.get_serializer(
            data={"image": image, "object_id": pk},
            context={"related_instance": service},
        )
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        photo = serializer.save()

        return Response({"photo": RetrievePhotoSerializer(instance=photo).data})

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

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        service = serializer.save()

        return Response({"review": RetrieveReviewSerializer(instance=service).data})

    
    @action(detail=True, methods=["get"], url_path="reviews")
    def reviews(self, request, pk=None):
        service = ServiceService.get_by_id(pk)
        reviews = service.get_reviews()
        serializer = RetrieveReviewSerializer(reviews, many=True)
        return Response(serializer.data)
