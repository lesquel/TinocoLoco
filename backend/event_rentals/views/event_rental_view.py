from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from base.system_services import EventRentalService
from users.permissions import IsAdminOrReadOnly
from photos.serializers import CreatePhotoSerializer, RetrievePhotoSerializer
from reviews.serializers import CreateReviewSerializer, RetrieveReviewSerializer
from ..filters import EventRentalFilter
from ..serializers import EventRentalSerializer, ChangeEventRentalStatusSerializer


class EventRentalViewSet(viewsets.ModelViewSet):
    http_method_names = ["get", "post", "put", "delete"]
    queryset = EventRentalService.get_all().order_by("-id")
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]
    filterset_class = EventRentalFilter

    def get_serializer_class(self):
        if self.action == "upload_image":
            return CreatePhotoSerializer
        elif self.action == "add_review":
            return CreateReviewSerializer
        elif self.action == "change_status":
            return ChangeEventRentalStatusSerializer
        return EventRentalSerializer

    def retrieve(self, request, pk=None):
        event_rental = EventRentalService.get_by_id(pk)

        event_rental.increment_visualizations()
        serializer = self.get_serializer(instance=event_rental)
        return Response({"event_rental": serializer.data})

    @action(detail=False, methods=["get"], url_path="most-viewed")
    def most_viewed(self, request):
        queryset = EventRentalService.get_most_viewed()
        serializer = self.get_serializer(queryset, many=True)
        return Response({"most_viewed": serializer.data}, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"], url_path="upload-photo")
    def upload_image(self, request, pk=None):
        event_rental = EventRentalService.get_by_id(pk)
        image = request.FILES.get("image")

        serializer = self.get_serializer(
            data={"image": image, "object_id": pk},
            context={"related_instance": event_rental},
        )
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        photo = serializer.save()

        return Response({"photo": RetrievePhotoSerializer(instance=photo).data})

    @action(detail=True, methods=["post"], url_path="add-review")
    def add_review(self, request, pk=None):
        event_rental = EventRentalService.get_by_id(pk)
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

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        review = serializer.save()

        if user.is_superuser:
            event_rental.owner_rating = review
        else:
            event_rental.costumer_rating = review

        event_rental.save()

        return Response({"review": RetrieveReviewSerializer(instance=review).data})

    @action(detail=True, methods=["get"], url_path="change-status")
    def change_status(self, request, pk=None):
        event_rental = EventRentalService.get_by_id(pk)
        serializer = self.get_serializer(
            instance=event_rental, data=request.data, context={"request": request}
        )
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        event_rental = serializer.save()

        return Response(
            {"event_rental": EventRentalSerializer(instance=event_rental).data}
        )
